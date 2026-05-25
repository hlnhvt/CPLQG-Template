import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
    Search, Flame, Clock, HelpCircle, FileText, CheckCircle2, User, Eye, 
    ThumbsUp, PlusCircle, MessageCircle, ChevronRight, Coins, MapPin, 
    Briefcase, Scale, Calendar, Check, ArrowLeft, MoreHorizontal, LayoutGrid 
} from 'lucide-react';
import CreateCauHoiModal from './CreateCauHoiModal';

// Comprehensive Database containing all 10 topics with highly relevant Vietnamese legal questions
const ALL_TOPICS_DATABASE = [
    {
        id: 'tien-te-ngan-hang',
        title: 'HỎI ĐÁP PHÁP LUẬT VỀ TIỀN TỆ - NGÂN HÀNG',
        domain: 'Tiền tệ',
        icon: Coins,
        iconBg: 'bg-amber-50 text-amber-600 border border-amber-100',
        featured: {
            id: '101',
            title: 'Đi nước ngoài mua vàng miếng mang về Việt Nam có bị xử phạt hành chính không?',
            content: 'Tôi sắp có chuyến công tác nước ngoài dài ngày và dự định mua một ít vàng miếng làm quà kỷ niệm mang về Việt Nam. Xin chuyên gia tư vấn giúp, việc mang vàng miếng từ nước ngoài về qua cửa khẩu sân bay có cần khai báo không? Có quy định giới hạn định lượng hay không và nếu vi phạm sẽ bị xử phạt như thế nào?',
            date: '10:15 24/05/2026',
            status: 'Đã trả lời',
            views: 3420,
            likes: 1240,
            replies: 1,
            author: 'Lê Hoàng Hải',
            isOfficial: true,
            image: '/thumbnails/currency_bank_illustration.png',
        },
        questions: [
            {
                id: '102',
                title: 'Văn bản hợp nhất Luật Các tổ chức tín dụng số 100/VBHN-VPQH 2026 chi tiết ra sao?',
                content: 'Tôi muốn tìm hiểu các nội dung sửa đổi mới nhất trong Luật Các tổ chức tín dụng hợp nhất năm 2026 để áp dụng cho hoạt động tín dụng nội bộ doanh nghiệp...',
                date: '08:30 23/05/2026',
                likes: 840,
                views: 1950,
                status: 'Đã trả lời',
                image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=150&q=80'
            },
            {
                id: '103',
                title: 'Toàn văn Thông tư 07/2026/TT-NHNN sửa đổi quy định hoạt động môi giới tiền tệ mới nhất?',
                content: 'Xin Ngân hàng Nhà nước hướng dẫn phạm vi và điều kiện để một chi nhánh ngân hàng thương mại cổ phần được thực hiện hoạt động môi giới tiền tệ liên ngân hàng...',
                date: '14:20 22/05/2026',
                likes: 620,
                views: 1100,
                status: 'Đã trả lời',
                image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=150&q=80'
            },
            {
                id: '104',
                title: 'Tỷ giá giao dịch USD tháng 5 năm 2026 biến động như thế nào theo Ngân hàng Nhà nước?',
                content: 'Tỷ giá trung tâm của Đồng Việt Nam với Đô la Mỹ được Ngân hàng Nhà nước áp dụng vào thời điểm cuối tháng 5/2026 cụ thể là bao nhiêu?',
                date: '09:00 21/05/2026',
                likes: 510,
                views: 980,
                status: 'Đã trả lời',
                image: 'https://images.unsplash.com/photo-1601597111158-2fceff270190?auto=format&fit=crop&w=150&q=80'
            },
            {
                id: '105',
                title: 'Mẫu công văn giải trình sai số tài khoản với bảo hiểm xã hội mới nhất 2026?',
                content: 'Kế toán công ty tôi nhập nhầm số tài khoản ngân hàng của người lao động khi làm hồ sơ hưởng bảo hiểm thai sản. Cần mẫu giải trình cụ thể nào gửi cơ quan BHXH?',
                date: '16:45 20/05/2026',
                likes: 430,
                views: 870,
                status: 'Đang chờ trả lời',
                image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=150&q=80'
            }
        ]
    },
    {
        id: 'dat-dai-nha-o',
        title: 'HỎI ĐÁP PHÁP LUẬT VỀ ĐẤT ĐAI - NHÀ Ở',
        domain: 'Đất đai',
        icon: MapPin,
        iconBg: 'bg-emerald-50 text-emerald-600 border border-emerald-100',
        featured: {
            id: '1',
            title: 'Quy định bồi thường giải phóng mặt bằng khi thu hồi đất ở nông thôn mới nhất?',
            content: 'Gia đình tôi có mảnh đất ở nông thôn diện tích 500m2 đang bị chính quyền địa phương thu hồi phục vụ dự án mở rộng quốc lộ. Xin luật sư cho biết, căn cứ pháp lý nào để xác định đơn giá đền bù giải phóng mặt bằng? Hộ gia đình của tôi có được cấp đất hoặc căn hộ tái định cư hay không?',
            date: '11:09 17/03/2026',
            status: 'Đã trả lời',
            views: 1250,
            likes: 450,
            replies: 2,
            author: 'Nguyễn Văn A',
            isOfficial: true,
            image: '/thumbnails/land_housing_illustration.png',
        },
        questions: [
            {
                id: '106',
                title: 'Đất chưa có sổ đỏ khi bị nhà nước thu hồi có được đền bù, hỗ trợ giải tỏa không?',
                content: 'Đất nông nghiệp khai hoang ổn định từ trước năm 1993, không có tranh chấp nhưng chưa được cấp sổ đỏ. Khi bị nhà nước thu hồi làm dự án công cộng có được đền bù không?',
                date: '15:10 18/05/2026',
                likes: 720,
                views: 2150,
                status: 'Đã trả lời',
                image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=150&q=80'
            },
            {
                id: '107',
                title: 'Thủ tục xin chuyển đổi từ đất trồng lúa sang đất xây dựng nhà ở năm 2026 cần những gì?',
                content: 'Tôi muốn chuyển đổi mục đích sử dụng 150m2 đất trồng lúa sang đất thổ cư để xây nhà cho con trai ra ở riêng. Hồ sơ và mức thuế phí cần chuẩn bị ra sao?',
                date: '10:30 15/05/2026',
                likes: 480,
                views: 1430,
                status: 'Đã trả lời',
                image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=150&q=80'
            },
            {
                id: '108',
                title: 'Hàng xóm xây nhà kiên cố đào móng gây nứt tường nhà tôi thì giải quyết như thế nào?',
                content: 'Nhà bên cạnh khởi công xây dựng 5 tầng, trong lúc ép cọc đào móng đã làm rạn nứt kết cấu móng và tường nhà tôi. Tôi cần làm đơn kiến nghị gửi cơ quan nào để tạm dừng thi công?',
                date: '14:40 12/05/2026',
                likes: 390,
                views: 1200,
                status: 'Đang chờ trả lời',
                image: 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=150&q=80'
            },
            {
                id: '113',
                title: 'Mua bán nhà đất bằng giấy viết tay từ trước năm 2008 có được cấp Sổ đỏ không?',
                content: 'Gia đình tôi mua một mảnh đất thổ cư 120m2 năm 2005 chỉ lập hợp đồng viết tay có chữ ký hai bên. Đến nay chủ cũ đã chuyển đi nơi khác, tôi có tự làm Sổ đỏ được không?',
                date: '09:15 05/05/2026',
                likes: 640,
                views: 1720,
                status: 'Đã trả lời',
                image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=150&q=80'
            }
        ]
    },
    {
        id: 'lao-dong-bao-hiem',
        title: 'HỎI ĐÁP PHÁP LUẬT VỀ LAO ĐỘNG - BẢO HIỂM',
        domain: 'Lao động',
        icon: Briefcase,
        iconBg: 'bg-blue-50 text-blue-600 border border-blue-100',
        featured: {
            id: '2',
            title: 'Điều kiện hưởng chế độ lương hưu trước độ tuổi quy định năm 2026?',
            content: 'Tôi năm nay tròn 55 tuổi, đã tham gia bảo hiểm xã hội bắt buộc được 25 năm liên tục, hiện đang làm việc nặng nhọc độc hại. Kính mong ban biên tập hướng dẫn cách tính tỷ lệ hưởng lương hưu và điều kiện nộp hồ sơ xin nghỉ hưu trước tuổi theo chính sách lao động mới nhất?',
            date: '09:15 16/03/2026',
            status: 'Đang chờ trả lời',
            views: 890,
            likes: 320,
            replies: 0,
            author: 'Trần Thị B',
            isOfficial: false,
            image: '/thumbnails/labor_insurance_illustration.png',
        },
        questions: [
            {
                id: '5',
                title: 'Xử lý kỷ luật lao động đối với nhân viên tự ý nghỉ việc 5 ngày liên tiếp không lý do?',
                content: 'Công ty chúng tôi có nhân viên tự ý nghỉ việc 5 ngày làm việc liên tục mà không có đơn xin phép hay lý do chính đáng. Quy trình họp xử lý kỷ luật sa thải cần lưu ý gì?',
                date: '16:45 13/03/2026',
                likes: 120,
                views: 500,
                status: 'Đang chờ trả lời',
                image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=150&q=80'
            },
            {
                id: '109',
                title: 'Doanh nghiệp nợ đóng bảo hiểm xã hội thì người lao động có tự chốt sổ bảo hiểm được không?',
                content: 'Công ty cũ của tôi đang nợ đóng BHXH hơn 6 tháng và đã giải thể. Tôi xin việc ở công ty mới nhưng không thể chốt sổ bảo hiểm ở công ty cũ. Cơ quan BHXH giải quyết việc này thế nào?',
                date: '11:20 19/05/2026',
                likes: 540,
                views: 1650,
                status: 'Đã trả lời',
                image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=150&q=80'
            },
            {
                id: '110',
                title: 'Cách tính tiền lương làm tăng ca vào ca đêm ngày Tết Âm lịch chuẩn xác nhất 2026?',
                content: 'Tôi phải trực ca đêm từ 22h tối đến 6h sáng hôm sau vào các ngày mùng 1 và mùng 2 Tết Nguyên Đán. Tiền lương làm thêm giờ của tôi được tính nhân với hệ số bao nhiêu?',
                date: '15:30 10/05/2026',
                likes: 410,
                views: 1120,
                status: 'Đã trả lời',
                image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=150&q=80'
            },
            {
                id: '114',
                title: 'Quy định mới về mức trợ cấp thất nghiệp tối đa người lao động được nhận năm 2026?',
                content: 'Tôi có thời gian tham gia bảo hiểm thất nghiệp là 8 năm, mức lương đóng BHXH trung bình là 15 triệu/tháng. Khi nghỉ việc tôi được hưởng trợ cấp thất nghiệp bao nhiêu một tháng?',
                date: '10:45 08/05/2026',
                likes: 380,
                views: 1250,
                status: 'Đã trả lời',
                image: 'https://images.unsplash.com/photo-1521791136368-1a469c52131a?auto=format&fit=crop&w=150&q=80'
            }
        ]
    },
    {
        id: 'dan-su-thua-ke',
        title: 'HỎI ĐÁP PHÁP LUẬT VỀ THỪA KẾ - DI CHÚC',
        domain: 'Dân sự',
        icon: Scale,
        iconBg: 'bg-purple-50 text-purple-600 border border-purple-100',
        featured: {
            id: '4',
            title: 'Quy định phân chia di sản thừa kế theo pháp luật khi không để lại di chúc?',
            content: 'Bố mẹ tôi đột ngột qua đời không để lại di chúc hay thỏa thuận chia tài sản bằng văn bản nào. Gia đình chúng tôi có 3 anh em ruột. Xin luật sư cho biết, mảnh đất hương hỏa của bố mẹ để lại sẽ được phân chia như thế nào giữa các anh em? Hàng thừa kế thứ nhất gồm những ai?',
            date: '08:30 14/03/2026',
            status: 'Đã trả lời',
            views: 1560,
            likes: 410,
            replies: 3,
            author: 'Người dùng ẩn danh',
            isOfficial: true,
            image: '/thumbnails/civil_inheritance_illustration.png',
        },
        questions: [
            {
                id: '7',
                title: 'Quyền tác giả đối với phần mềm lập trình mã nguồn mở được bảo hộ ra sao?',
                content: 'Tôi phát triển một thư viện code nguồn mở trên Github và đăng ký bản quyền MIT. Doanh nghiệp khác lấy code của tôi thương mại hóa mà không ghi nguồn có vi phạm luật dân sự không?',
                date: '14:30 11/03/2026',
                likes: 80,
                views: 400,
                status: 'Đã trả lời',
                image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=150&q=80'
            },
            {
                id: '111',
                title: 'Hợp đồng đặt cọc mua nhà đất viết tay không qua công chứng có hiệu lực pháp lý không?',
                content: 'Chúng tôi làm giấy cọc tiền mua đất 100 triệu bằng giấy viết tay có người làm chứng. Nay chủ đất đổi ý không bán và không chịu đền cọc. Tôi có kiện ra tòa dân sự được không?',
                date: '08:20 22/05/2026',
                likes: 670,
                views: 1890,
                status: 'Đã trả lời',
                image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=150&q=80'
            },
            {
                id: '112',
                title: 'Mức xử phạt hành chính đối với hành vi bôi nhọ, xúc phạm danh dự người khác trên mạng?',
                content: 'Một tài khoản facebook liên tục đăng bài bôi nhọ đời tư và xúc phạm danh dự gia đình tôi trên các hội nhóm địa phương. Mức phạt tiền và quy trình trình báo công an thế nào?',
                date: '14:15 14/05/2026',
                likes: 580,
                views: 1350,
                status: 'Đã trả lời',
                image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=150&q=80'
            },
            {
                id: '115',
                title: 'Thủ tục lập di chúc thừa kế tài sản tại Văn phòng công chứng cần những giấy tờ gì?',
                content: 'Tôi muốn lập di chúc phân chia tài sản nhà đất cho các con tại phòng công chứng. Tôi cần chuẩn bị các hồ sơ pháp lý và giấy chứng nhận sức khỏe như thế nào?',
                date: '09:20 18/05/2026',
                likes: 490,
                views: 1100,
                status: 'Đã trả lời',
                image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=150&q=80'
            }
        ]
    },
    {
        id: 'nghia-vu-quan-su',
        title: 'HỎI ĐÁP PHÁP LUẬT VỀ NGHĨA VỤ QUÂN SỰ',
        domain: 'Nghĩa vụ quân sự',
        icon: Scale,
        iconBg: 'bg-red-50 text-red-600 border border-red-100',
        featured: {
            id: '201',
            title: 'Độ tuổi gọi nhập ngũ năm 2026 và các trường hợp tạm hoãn nghĩa vụ quân sự?',
            content: 'Tôi năm nay 25 tuổi, vừa tốt nghiệp đại học và đang làm việc cho một doanh nghiệp công nghệ. Kính mong luật sư tư vấn, độ tuổi tối đa gọi nhập ngũ hiện tại là bao nhiêu? Trong trường hợp nào thanh niên được xem xét tạm hoãn hoặc miễn nghĩa vụ quân sự bắt buộc?',
            date: '08:30 25/05/2026',
            status: 'Đã trả lời',
            views: 4500,
            likes: 1890,
            replies: 1,
            author: 'Phạm Minh Hoàng',
            isOfficial: true,
            image: '/thumbnails/civil_inheritance_illustration.png',
        },
        questions: [
            {
                id: '202',
                title: 'Cận thị bao nhiêu độ thì được miễn đi nghĩa vụ quân sự theo quy định mới nhất?',
                content: 'Tôi bị cận thị mắt phải 2.5 độ, mắt trái 3.25 độ và có loạn thị nhẹ. Theo thông tư hướng dẫn khám tuyển mới nhất, tôi có thuộc diện được miễn nghĩa vụ quân sự không?',
                date: '14:20 24/05/2026',
                likes: 1450,
                views: 3200,
                status: 'Đã trả lời',
                image: 'https://images.unsplash.com/photo-1516205651411-aef33a44f7c2?auto=format&fit=crop&w=150&q=80'
            },
            {
                id: '203',
                title: 'Đang theo học đại học chính quy có được tạm hoãn gọi nhập ngũ nghĩa vụ quân sự không?',
                content: 'Tôi đang là sinh viên năm thứ 3 hệ chính quy của một trường đại học tại Hà Nội. Ban chỉ huy quân sự phường gửi giấy gọi khám tuyển quân sự, tôi làm hồ sơ xin tạm hoãn thế nào?',
                date: '09:00 23/05/2026',
                likes: 920,
                views: 2100,
                status: 'Đã trả lời',
                image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=150&q=80'
            },
            {
                id: '204',
                title: 'Hành vi cố ý trốn tránh nghĩa vụ quân sự bị xử phạt hành chính hay hình sự năm 2026?',
                content: 'Người có lệnh gọi nhập ngũ nhưng cố ý không chấp hành, không có mặt tại địa điểm tập trung thì bị phạt tiền bao nhiêu? Có bị truy cứu trách nhiệm hình sự phạt tù không?',
                date: '16:45 22/05/2026',
                likes: 850,
                views: 1800,
                status: 'Đã trả lời',
                image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=150&q=80'
            },
            {
                id: '205',
                title: 'Chế độ, chính sách được hưởng đối với hạ sĩ quan, binh sĩ khi xuất ngũ năm 2026?',
                content: 'Tôi chuẩn bị hoàn thành nghĩa vụ quân sự xuất ngũ vào tháng tới. Kính hỏi luật sư, khi xuất ngũ tôi được hưởng các khoản trợ cấp, tiền tàu xe và thẻ học nghề như thế nào?',
                date: '10:30 20/05/2026',
                likes: 670,
                views: 1400,
                status: 'Đã trả lời',
                image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=150&q=80'
            }
        ]
    },
    {
        id: 'tranh-chap-dat-dai',
        title: 'HỎI ĐÁP PHÁP LUẬT VỀ TRANH CHẤP ĐẤT ĐAI',
        domain: 'Đất đai',
        icon: MapPin,
        iconBg: 'bg-emerald-50 text-emerald-600 border border-emerald-100',
        featured: {
            id: '301',
            title: 'Thủ tục và quy trình hòa giải tranh chấp đất đai tại Ủy ban nhân dân cấp xã?',
            content: 'Mảnh đất nông nghiệp của gia đình tôi đang bị hộ bên cạnh lấn chiếm ranh giới. Tôi muốn nộp đơn yêu cầu giải quyết tranh chấp đất đai. Xin luật sư hướng dẫn quy trình nộp đơn và thủ tục hòa giải bắt buộc tại UBND cấp xã diễn ra trong thời hạn bao lâu?',
            date: '09:00 24/05/2026',
            status: 'Đã trả lời',
            views: 3120,
            likes: 1430,
            replies: 1,
            author: 'Nguyễn Văn Cường',
            isOfficial: true,
            image: '/thumbnails/land_housing_illustration.png',
        },
        questions: [
            {
                id: '302',
                title: 'Hàng xóm lấn chiếm đất đai ranh giới liền kề giải quyết như thế nào hiệu quả?',
                content: 'Trong lúc xây tường bao, nhà hàng xóm đã lấn sang phần đất của tôi khoảng 20cm chạy dọc theo chiều dài mảnh đất. Tôi đã làm đơn gửi xã nhưng chưa được hòa giải...',
                date: '11:15 22/05/2026',
                likes: 850,
                views: 1800,
                status: 'Đã trả lời',
                image: 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=150&q=80'
            },
            {
                id: '303',
                title: 'Tranh chấp đất đai chưa có Sổ đỏ thì thẩm quyền giải quyết thuộc về cơ quan nào?',
                content: 'Mảnh đất của bố mẹ tôi khai hoang từ trước năm 1993, nay bị tranh chấp lối đi chung nhưng chưa được cấp Sổ đỏ. Khi khởi kiện thì Tòa án hay UBND quận có thẩm quyền giải quyết?',
                date: '15:30 20/05/2026',
                likes: 720,
                views: 1560,
                status: 'Đã trả lời',
                image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=150&q=80'
            },
            {
                id: '304',
                title: 'Thời hiệu khởi kiện tranh chấp đất đai đòi lại quyền sử dụng đất hợp pháp?',
                content: 'Mảnh đất của gia đình tôi bị người khác chiếm dụng xây nhà từ năm 2015. Đến nay tôi khởi kiện đòi lại quyền sử dụng đất có còn thời hiệu khởi kiện theo Luật Đất đai mới nhất không?',
                date: '08:15 15/05/2026',
                likes: 680,
                views: 1200,
                status: 'Đã trả lời',
                image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=150&q=80'
            },
            {
                id: '305',
                title: 'Áp dụng biện pháp khẩn cấp tạm thời cấm thay đổi hiện trạng đất đai đang tranh chấp?',
                content: 'Tôi đang chuẩn bị làm đơn khởi kiện tranh chấp quyền sử dụng đất với người chú ruột. Tuy nhiên, hiện tại người chú đang kêu thợ xây nhà kiên cố trên đất. Tôi làm đơn cấm xây dựng thế nào?',
                date: '14:40 10/05/2026',
                likes: 540,
                views: 980,
                status: 'Đang chờ trả lời',
                image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=150&q=80'
            }
        ]
    },
    {
        id: 'bao-hiem-xa-hoi',
        title: 'HỎI ĐÁP PHÁP LUẬT VỀ BẢO HIỂM XÃ HỘI',
        domain: 'Bảo hiểm',
        icon: Briefcase,
        iconBg: 'bg-blue-50 text-blue-600 border border-blue-100',
        featured: {
            id: '401',
            title: 'Thủ tục nhận bảo hiểm xã hội một lần năm 2026 cần chuẩn bị những giấy tờ gì?',
            content: 'Tôi đã nghỉ việc ở công ty cũ được hơn 1 năm và ngừng đóng bảo hiểm xã hội tự nguyện, hiện tại đang làm kinh doanh tự do. Tôi có mong muốn rút bảo hiểm xã hội một lần. Xin chuyên gia hướng dẫn hồ sơ xin rút gồm những giấy tờ gì, nộp ở cơ quan nào và cách tính số tiền được nhận?',
            date: '10:45 24/05/2026',
            status: 'Đã trả lời',
            views: 3950,
            likes: 1640,
            replies: 1,
            author: 'Nguyễn Thúy Vy',
            isOfficial: true,
            image: '/thumbnails/labor_insurance_illustration.png',
        },
        questions: [
            {
                id: '402',
                title: 'Cách tính mức hưởng lương hưu hàng tháng đối với lao động nam và lao động nữ?',
                content: 'Tôi là nữ đóng BHXH được 28 năm, còn chồng tôi đóng được 32 năm. Khi đủ tuổi nghỉ hưu, tỷ lệ hưởng lương hưu hàng tháng của chúng tôi được tính cụ thể theo công thức nào?',
                date: '08:30 22/05/2026',
                likes: 1100,
                views: 2200,
                status: 'Đã trả lời',
                image: 'https://images.unsplash.com/photo-1521791136368-1a469c52131a?auto=format&fit=crop&w=150&q=80'
            },
            {
                id: '403',
                title: 'Thời gian nộp hồ sơ hưởng trợ cấp thất nghiệp tối đa là bao lâu sau khi chấm dứt HĐLD?',
                content: 'Tôi vừa chấm dứt hợp đồng lao động với công ty ngày 30/04/2026. Hết thời hạn bao nhiêu ngày nếu tôi không nộp hồ sơ hưởng trợ cấp thất nghiệp thì quyền lợi này sẽ bị bảo lưu?',
                date: '14:20 18/05/2026',
                likes: 850,
                views: 1600,
                status: 'Đã trả lời',
                image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=150&q=80'
            },
            {
                id: '404',
                title: 'Mức đóng và mức hưởng bảo hiểm xã hội tự nguyện mới nhất áp dụng năm 2026?',
                content: 'Lao động tự do muốn tham gia bảo hiểm xã hội tự nguyện thì mức đóng tối thiểu và tối đa hàng tháng là bao nhiêu? Có nhận được tiền hỗ trợ đóng thuế từ nhà nước không?',
                date: '09:00 12/05/2026',
                likes: 670,
                views: 1300,
                status: 'Đang chờ trả lời',
                image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=150&q=80'
            },
            {
                id: '405',
                title: 'Quy định rút ngắn thời gian đóng BHXH tối thiểu xuống 15 năm để hưởng lương hưu?',
                content: 'Tôi nghe nói có quy định mới cho phép người lao động đóng BHXH tối thiểu 15 năm (thay vì 20 năm) là được hưởng lương hưu. Chính sách này đã được áp dụng chính thức chưa?',
                date: '16:45 05/05/2026',
                likes: 1200,
                views: 2900,
                status: 'Đã trả lời',
                image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=150&q=80'
            }
        ]
    },
    {
        id: 'thu-tuc-ly-hon',
        title: 'HỎI ĐÁP PHÁP LUẬT VỀ THỦ TỤC LY HÔN',
        domain: 'Hôn nhân',
        icon: Scale,
        iconBg: 'bg-purple-50 text-purple-600 border border-purple-100',
        featured: {
            id: '501',
            title: 'Thủ tục ly hôn đơn phương và thời gian giải quyết của Tòa án mất bao lâu?',
            content: 'Vợ chồng tôi xảy ra mâu thuẫn trầm trọng đã ly thân hơn 2 năm nay. Nay tôi muốn nộp đơn ly hôn đơn phương nhưng chồng tôi cố tình tránh mặt và không hợp tác ký giấy tờ. Xin hỏi tôi nộp đơn ở đâu, thủ tục cần những giấy tờ gì và Tòa án giải quyết trong thời gian bao lâu?',
            date: '14:20 24/05/2026',
            status: 'Đã trả lời',
            views: 4120,
            likes: 1950,
            replies: 1,
            author: 'Trần Thị Kim Oanh',
            isOfficial: true,
            image: '/thumbnails/civil_inheritance_illustration.png',
        },
        questions: [
            {
                id: '502',
                title: 'Quy trình thuận tình ly hôn và cách phân chia tài sản chung của hai vợ chồng?',
                content: 'Hai vợ chồng tôi đồng thuận ly hôn và đã tự thỏa thuận được việc chia tài sản cùng quyền nuôi con. Chúng tôi nộp đơn thuận tình ly hôn cần đóng án phí bao nhiêu tiền?',
                date: '10:45 22/05/2026',
                likes: 850,
                views: 1600,
                status: 'Đã trả lời',
                image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=150&q=80'
            },
            {
                id: '503',
                title: 'Quyền trực tiếp nuôi con dưới 36 tháng tuổi khi ly hôn thuộc về cha hay mẹ?',
                content: 'Chúng tôi ly hôn khi con trai mới tròn 14 tháng tuổi. Chồng tôi đòi quyền nuôi con vì thu nhập của anh cao hơn tôi rất nhiều. Tòa án sẽ ưu tiên xét quyền nuôi con thuộc về ai?',
                date: '09:00 18/05/2026',
                likes: 920,
                views: 1750,
                status: 'Đã trả lời',
                image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=150&q=80'
            },
            {
                id: '504',
                title: 'Mức cấp dưỡng nuôi con tối thiểu sau khi vợ chồng ly hôn tính thế nào?',
                content: 'Tôi được quyền trực tiếp nuôi 2 con nhỏ sau ly hôn. Chồng cũ có nghĩa vụ cấp dưỡng hàng tháng, mức tiền cấp dưỡng tối thiểu được pháp luật quy định dựa trên căn cứ nào?',
                date: '16:45 12/05/2026',
                likes: 640,
                views: 1100,
                status: 'Đang chờ trả lời',
                image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=150&q=80'
            },
            {
                id: '505',
                title: 'Nộp đơn ly hôn ở đâu khi vợ hoặc chồng đang sinh sống và làm việc tại nước ngoài?',
                content: 'Tôi muốn ly hôn với vợ hiện đang định cư tại Nhật Bản và không có địa chỉ cụ thể. Tôi cần nộp hồ sơ tại cơ quan Tòa án cấp nào để được thụ lý giải quyết ly hôn?',
                date: '11:20 05/05/2026',
                likes: 780,
                views: 1300,
                status: 'Đã trả lời',
                image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=150&q=80'
            }
        ]
    },
    {
        id: 'hoi-dap-ve-dang',
        title: 'HỎI ĐÁP VỀ ĐẢNG VÀ HOẠT ĐỘNG ĐẢNG VỊ',
        domain: 'Đảng',
        icon: Scale,
        iconBg: 'bg-red-100 text-red-700 border border-red-200',
        featured: {
            id: '601',
            title: 'Thủ tục kết nạp Đảng viên mới và các điều kiện xem xét kết nạp là gì?',
            content: 'Tôi đang là quần chúng ưu tú tại chi bộ cơ quan hành chính sự nghiệp, chuẩn bị làm hồ sơ xem xét kết nạp Đảng. Xin ban biên tập hướng dẫn chi tiết hồ sơ cần chuẩn bị những tài liệu gì? Quy trình xác minh lý lịch ba đời được thực hiện như thế nào theo quy định Đảng mới nhất?',
            date: '08:30 25/05/2026',
            status: 'Đã trả lời',
            views: 4200,
            likes: 1750,
            replies: 1,
            author: 'Nguyễn Văn Đạt',
            isOfficial: true,
            image: '/thumbnails/civil_inheritance_illustration.png',
        },
        questions: [
            {
                id: '602',
                title: 'Quy trình chuyển sinh hoạt Đảng chính thức sang cơ quan, đơn vị mới?',
                content: 'Tôi vừa trúng tuyển công chức sang một sở ngành khác ở tỉnh lân cận. Tôi cần làm những thủ tục gì để xin chuyển sinh hoạt Đảng chính thức từ chi bộ cũ sang chi bộ mới?',
                date: '14:20 22/05/2026',
                likes: 810,
                views: 1500,
                status: 'Đã trả lời',
                image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=150&q=80'
            },
            {
                id: '603',
                title: 'Thời gian dự bị của Đảng viên là bao lâu và quy trình xét công nhận chính thức?',
                content: 'Tôi được kết nạp Đảng viên dự bị từ tháng 05/2025. Hết thời hạn bao nhiêu lâu chi bộ sẽ họp xét công nhận Đảng viên chính thức và tôi cần viết bản tự kiểm điểm ra sao?',
                date: '09:00 15/05/2026',
                likes: 670,
                views: 1200,
                status: 'Đã trả lời',
                image: 'https://images.unsplash.com/photo-1521791136368-1a469c52131a?auto=format&fit=crop&w=150&q=80'
            },
            {
                id: '604',
                title: 'Đảng viên viết đơn tự nguyện xin ra khỏi Đảng hoặc tự ý bỏ sinh hoạt Đảng?',
                content: 'Vì lý do cá nhân công tác nước ngoài dài ngày, Đảng viên có quyền tự nguyện xin ra khỏi Đảng không? Việc tự ý bỏ sinh hoạt Đảng liên tiếp 3 tháng bị xử lý kỷ luật thế nào?',
                date: '16:45 10/05/2026',
                likes: 540,
                views: 950,
                status: 'Đang chờ trả lời',
                image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=150&q=80'
            },
            {
                id: '605',
                title: 'Quy định xử lý kỷ luật Đảng viên vi phạm chính sách kế hoạch hóa gia đình mới nhất?',
                content: 'Đảng viên sinh con thứ ba hoặc thứ tư thì bị áp dụng hình thức kỷ luật Đảng cụ thể là gì (khiển trách, cảnh cáo hay khai trừ)? Có ảnh hưởng tới việc quy hoạch cán bộ không?',
                date: '11:20 01/05/2026',
                likes: 950,
                views: 1900,
                status: 'Đã trả lời',
                image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=150&q=80'
            }
        ]
    },
    {
        id: 'kinh-doanh-van-tai',
        title: 'HỎI ĐÁP PHÁP LUẬT VỀ KINH DOANH VẬN TẢI',
        domain: 'Vận tải',
        icon: Briefcase,
        iconBg: 'bg-yellow-50 text-yellow-600 border border-yellow-100',
        featured: {
            id: '701',
            title: 'Điều kiện cấp Giấy phép kinh doanh vận tải bằng xe ô tô năm 2026?',
            content: 'Công ty chúng tôi đang dự định đầu tư mua 15 xe tải từ 3.5 tấn đến 10 tấn để vận chuyển hàng hóa nội bộ và kinh doanh dịch vụ giao nhận vận chuyển hàng hóa. Xin luật sư cho biết, điều kiện để được cấp Giấy phép kinh doanh vận tải đối với doanh nghiệp có xe tải thương mại hiện nay thế nào?',
            date: '09:00 24/05/2026',
            status: 'Đã trả lời',
            views: 3250,
            likes: 1200,
            replies: 1,
            author: 'Đỗ Quốc Việt',
            isOfficial: true,
            image: '/thumbnails/labor_insurance_illustration.png',
        },
        questions: [
            {
                id: '702',
                title: 'Xe công nghệ dưới 9 chỗ có bắt buộc phải lắp thiết bị giám sát hành trình GPS không?',
                content: 'Tôi muốn hợp tác chạy xe công nghệ Grab Car dưới 9 chỗ. Xe cá nhân của tôi có bắt buộc phải lắp thiết bị giám sát hành trình hợp chuẩn và gửi dữ liệu về Bộ GTVT không?',
                date: '11:15 20/05/2026',
                likes: 840,
                views: 1650,
                status: 'Đã trả lời',
                image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=150&q=80'
            },
            {
                id: '703',
                title: 'Quy định xử phạt đối với hành vi điều khiển xe ô tô kinh doanh vận tải không dán phù hiệu?',
                content: 'Xe tải kinh doanh của gia đình bị công an giao thông xử lý lỗi không gắn phù hiệu xe tải theo quy định. Mức xử phạt hành chính đối với lái xe và chủ phương tiện cụ thể là bao nhiêu?',
                date: '15:30 18/05/2026',
                likes: 670,
                views: 1200,
                status: 'Đã trả lời',
                image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=150&q=80'
            },
            {
                id: '704',
                title: 'Thời hạn đăng kiểm định kỳ đối với xe ô tô kinh doanh vận tải hành khách?',
                content: 'Xe khách 29 chỗ kinh doanh vận tải của công ty có chu kỳ đăng kiểm định kỳ là bao nhiêu tháng? Quy định giãn chu kỳ đăng kiểm mới có áp dụng đối với xe chở khách không?',
                date: '08:15 12/05/2026',
                likes: 580,
                views: 950,
                status: 'Đang chờ trả lời',
                image: 'https://images.unsplash.com/photo-1521791136368-1a469c52131a?auto=format&fit=crop&w=150&q=80'
            },
            {
                id: '705',
                title: 'Thủ tục xin cấp phù hiệu xe tải hợp tác xã kinh doanh vận tải cần những gì?',
                content: 'Tôi muốn tham gia vào hợp tác xã vận tải để được cấp phù hiệu xe tải chạy hợp pháp. Quy trình nộp hồ sơ, mức chi phí và thời hạn hiệu lực của phù hiệu là bao lâu?',
                date: '14:40 05/05/2026',
                likes: 720,
                views: 1100,
                status: 'Đã trả lời',
                image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=150&q=80'
            }
        ]
    },
    {
        id: 'xuat-nhap-khau',
        title: 'HỎI ĐÁP PHÁP LUẬT VỀ XUẤT NHẬP KHẨU',
        domain: 'Thương mại',
        icon: Coins,
        iconBg: 'bg-blue-50 text-blue-600 border border-blue-100',
        featured: {
            id: '801',
            title: 'Quy trình khai báo thủ tục hải quan điện tử đối với hàng hóa nhập khẩu thương mại?',
            content: 'Doanh nghiệp của tôi chuẩn bị nhập khẩu lô hàng linh kiện điện tử từ đối tác Nhật Bản. Kính mong cơ quan hải quan tư vấn chi tiết quy trình truyền tờ khai hải quan điện tử trên hệ thống VNACCS/VCIS? Thời hạn nộp hồ sơ hải quan và đóng thuế nhập khẩu tối đa là bao lâu?',
            date: '10:15 24/05/2026',
            status: 'Đã trả lời',
            views: 3100,
            likes: 1250,
            replies: 1,
            author: 'Vũ Thị Minh Ngọc',
            isOfficial: true,
            image: '/thumbnails/currency_bank_illustration.png',
        },
        questions: [
            {
                id: '802',
                title: 'Các trường hợp doanh nghiệp được miễn thuế xuất khẩu, thuế nhập khẩu năm 2026?',
                content: 'Theo Luật Thuế xuất khẩu, nhập khẩu hiện hành, doanh nghiệp nhập khẩu nguyên liệu gia công xuất khẩu cho thương nhân nước ngoài có được miễn thuế nhập khẩu hoàn toàn không?',
                date: '08:30 20/05/2026',
                likes: 850,
                views: 1560,
                status: 'Đã trả lời',
                image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=150&q=80'
            },
            {
                id: '803',
                title: 'Thủ tục xin cấp Giấy chứng nhận xuất xứ hàng hóa (C/O) mẫu D xuất khẩu ASEAN?',
                content: 'Chúng tôi chuẩn bị xuất khẩu lô hàng nông sản sang Thái Lan và muốn xin C/O mẫu D để đối tác hưởng ưu đãi thuế FTA. Hồ sơ khai báo tại Bộ Công Thương gồm những gì?',
                date: '14:20 18/05/2026',
                likes: 690,
                views: 1100,
                status: 'Đã trả lời',
                image: 'https://images.unsplash.com/photo-1601597111158-2fceff270190?auto=format&fit=crop&w=150&q=80'
            },
            {
                id: '804',
                title: 'Quy định xử phạt đối với hành vi khai sai mã HS Code hàng hóa nhập khẩu thương mại?',
                content: 'Doanh nghiệp khai nhầm mã HS Code của mặt hàng thép không gỉ dẫn đến đóng thiếu 5% tiền thuế. Cơ quan hải quan xử phạt vi phạm hành chính và phạt nộp chậm thế nào?',
                date: '09:00 12/05/2026',
                likes: 540,
                views: 920,
                status: 'Đang chờ trả lời',
                image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=150&q=80'
            },
            {
                id: '805',
                title: 'Hồ sơ hoàn thuế nhập khẩu đối với nguyên liệu dùng để sản xuất hàng hóa xuất khẩu?',
                content: 'Doanh nghiệp đã đóng thuế nhập khẩu cho lô hàng da thuộc sản xuất giày xuất khẩu. Sau khi xuất khẩu sản phẩm hoàn chỉnh, chúng tôi cần nộp những giấy tờ gì để làm hồ sơ hoàn thuế?',
                date: '16:45 05/05/2026',
                likes: 710,
                views: 1300,
                status: 'Đã trả lời',
                image: 'https://images.unsplash.com/photo-1610374792793-f016b77ca51a?auto=format&fit=crop&w=150&q=80'
            }
        ]
    },
    {
        id: 'thue-gtgt',
        title: 'HỎI ĐÁP PHÁP LUẬT VỀ THUẾ GIÁ TRỊ GIA TĂNG',
        domain: 'Thuế',
        icon: Coins,
        iconBg: 'bg-amber-50 text-amber-600 border border-amber-100',
        featured: {
            id: '901',
            title: 'Các trường hợp doanh nghiệp được xét hoàn thuế giá trị gia tăng (VAT) năm 2026?',
            content: 'Doanh nghiệp sản xuất hàng linh kiện xuất khẩu của chúng tôi có số thuế VAT đầu vào chưa được khấu trừ hết lũy kế trên 300 triệu đồng. Xin chi cục thuế hướng dẫn doanh nghiệp có thuộc diện được hoàn thuế VAT xuất khẩu không? Quy trình nộp hồ sơ hoàn thuế trực tuyến ra sao?',
            date: '10:15 24/05/2026',
            status: 'Đã trả lời',
            views: 3150,
            likes: 1200,
            replies: 1,
            author: 'Lê Minh Trí',
            isOfficial: true,
            image: '/thumbnails/currency_bank_illustration.png',
        },
        questions: [
            {
                id: '902',
                title: 'Đối tượng hàng hóa, dịch vụ nào được áp dụng mức thuế suất VAT 8% năm 2026?',
                content: 'Chính sách giảm thuế VAT xuống 8% đối với một số nhóm hàng hóa dịch vụ có được tiếp tục gia hạn áp dụng trong năm 2026 không? Nhóm ngành tài chính, viễn thông có được giảm không?',
                date: '08:30 20/05/2026',
                likes: 870,
                views: 1600,
                status: 'Đã trả lời',
                image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=150&q=80'
            },
            {
                id: '903',
                title: 'Thủ tục kê khai thuế giá trị gia tăng theo tháng và theo quý khác nhau như thế nào?',
                content: 'Doanh nghiệp mới thành lập có doanh thu dưới 50 tỷ đồng có được lựa chọn kê khai thuế giá trị gia tăng theo quý không? Điều kiện chuyển đổi từ kê khai tháng sang quý ra sao?',
                date: '14:20 15/05/2026',
                likes: 620,
                views: 1100,
                status: 'Đã trả lời',
                image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=150&q=80'
            },
            {
                id: '904',
                title: 'Quy định về thời điểm xuất hóa đơn điện tử đối với hoạt động xây dựng, lắp đặt?',
                content: 'Công ty làm dịch vụ xây dựng công trình, thời điểm lập hóa đơn điện tử VAT tính khi nghiệm thu giai đoạn công trình hay khi khách hàng thanh toán tiền mặt?',
                date: '09:00 10/05/2026',
                likes: 510,
                views: 950,
                status: 'Đang chờ trả lời',
                image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=150&q=80'
            },
            {
                id: '905',
                title: 'Cách xử lý khi viết sai tên công ty hoặc mã số thuế trên hóa đơn điện tử VAT đã ký?',
                content: 'Tôi lỡ ký phát hành hóa đơn điện tử nhưng ghi sai mã số thuế của khách hàng. Tôi cần làm biên bản điều chỉnh hay làm thủ tục hủy hóa đơn và lập hóa đơn thay thế mới?',
                date: '16:45 05/05/2026',
                likes: 740,
                views: 1200,
                status: 'Đã trả lời',
                image: 'https://images.unsplash.com/photo-1601597111158-2fceff270190?auto=format&fit=crop&w=150&q=80'
            }
        ]
    },
    {
        id: 'bien-so-xe',
        title: 'HỎI ĐÁP PHÁP LUẬT VỀ BIỂN SỐ XE Ô TÔ',
        domain: 'Giao thông',
        icon: MapPin,
        iconBg: 'bg-emerald-50 text-emerald-600 border border-emerald-100',
        featured: {
            id: '1001',
            title: 'Thủ tục đăng ký và cấp biển số xe ô tô trúng đấu giá mới nhất năm 2026?',
            content: 'Tôi vừa trúng đấu giá một biển số xe đẹp trực tuyến từ Công ty đấu giá hợp danh. Xin luật sư cho biết, thủ tục đăng ký gắn biển số trúng đấu giá này vào chiếc xe ô tô mới mua của tôi cần chuẩn bị những hồ sơ gì? Tôi có được chuyển nhượng biển số xe này cho người khác không?',
            date: '10:45 24/05/2026',
            status: 'Đã trả lời',
            views: 3820,
            likes: 1540,
            replies: 1,
            author: 'Nguyễn Tiến Đạt',
            isOfficial: true,
            image: '/thumbnails/land_housing_illustration.png',
        },
        questions: [
            {
                id: '1002',
                title: 'Định danh biển số xe ô tô là gì và quy trình thu hồi biển số định danh khi bán xe?',
                content: 'Tôi bán chiếc xe ô tô cũ đời 2020 của mình cho người khác. Theo quy định về biển số định danh, biển số xe 5 số cũ của tôi có bị thu hồi không? Tôi có được lắp biển số đó vào xe mới mua không?',
                date: '08:30 22/05/2026',
                likes: 980,
                views: 2100,
                status: 'Đã trả lời',
                image: 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=150&q=80'
            },
            {
                id: '1003',
                title: 'Thủ tục sang tên đổi chủ xe ô tô khác tỉnh và cấp lại biển số định danh mới cần gì?',
                content: 'Tôi mua lại một chiếc xe ô tô cũ đăng ký biển số tại TP. Hồ Chí Minh, hiện tôi đang có hộ khẩu tại TP. Đà Nẵng. Thủ tục rút hồ sơ gốc và đăng ký sang tên đổi chủ cần đóng lệ phí trước bạ thế nào?',
                date: '14:20 19/05/2026',
                likes: 840,
                views: 1650,
                status: 'Đã trả lời',
                image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=150&q=80'
            },
            {
                id: '1004',
                title: 'Quy định xử phạt đối với hành vi lắp biển số xe ô tô bị che khuất hoặc không đúng vị trí?',
                content: 'Tài xế cố tình dán băng dính che chữ số hoặc lắp biển số xe ô tô bị nghiêng, mờ số để tránh phạt nguội camera thì bị cảnh sát giao thông phạt tiền bao nhiêu? Có bị tước bằng lái xe không?',
                date: '09:00 15/05/2026',
                likes: 710,
                views: 1200,
                status: 'Đang chờ trả lời',
                image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=150&q=80'
            },
            {
                id: '1005',
                title: 'Xe ô tô không chính chủ có được đăng ký cấp biển số xe ô tô định danh không?',
                content: 'Tôi mua lại xe cũ nhưng chưa làm thủ tục sang tên (chỉ có giấy ủy quyền sử dụng). Nay tôi đi đăng ký biển số xe định danh mang tên tôi trên phần mềm VNeID có được chấp nhận giải quyết không?',
                date: '16:45 08/05/2026',
                likes: 620,
                views: 1100,
                status: 'Đã trả lời',
                image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=150&q=80'
            }
        ]
    }
];

// Display the first 4 default categories on the overview page
const TOPIC_SECTIONS = ALL_TOPICS_DATABASE.slice(0, 4);

const POPULAR_TAGS = [
    { label: 'Thừa kế di chúc', target: 'dan-su-thua-ke' },
    { label: 'Nghĩa vụ quân sự', target: 'nghia-vu-quan-su' },
    { label: 'Tranh chấp đất đai', target: 'tranh-chap-dat-dai' },
    { label: 'Bảo hiểm xã hội', target: 'bao-hiem-xa-hoi' },
    { label: 'Thủ tục ly hôn', target: 'thu-tuc-ly-hon' },
    { label: 'Hỏi đáp về Đảng', target: 'hoi-dap-ve-dang' },
    { label: 'Kinh doanh vận tải', target: 'kinh-doanh-van-tai' },
    { label: 'Xuất nhập khẩu', target: 'xuat-nhap-khau' },
    { label: 'Thuế giá trị gia tăng', target: 'thue-gtgt' },
    { label: 'Biển số xe ô tô', target: 'bien-so-xe' }
];

const ChuDeHoiDapPage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    
    // UI dynamic states
    const [showAllTags, setShowAllTags] = useState(false);

    // Local topic search and pagination states
    const [localSearchTerm, setLocalSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const topicParam = searchParams.get('topic');
    const selectedTopicId = topicParam || null;

    // Determine selected tag name dynamically
    const selectedTagName = topicParam 
        ? (POPULAR_TAGS.find(t => t.target === topicParam)?.label || 
           ALL_TOPICS_DATABASE.find(sec => sec.id === topicParam)?.domain || 
           null)
        : null;

    const handleTopicSelect = (topicId, tagName) => {
        if (topicId) {
            setSearchParams({ topic: topicId });
        } else {
            setSearchParams({});
        }
        setLocalSearchTerm('');
        setCurrentPage(1);
    };

    const handleCreateClick = () => {
        if (!user) {
            navigate('/dang-nhap', { state: { from: '/cau-hoi-phap-luat/chu-de' } });
        } else {
            setIsCreateModalOpen(true);
        }
    };

    // Filter tags to display (6 tags initially, then expand to all if showAllTags is true)
    const displayedTags = showAllTags ? POPULAR_TAGS : POPULAR_TAGS.slice(0, 6);

    // Get the details of the active selected topic if set (fallback to first topic to prevent runtime undefined reference crashes during HMR/pre-render)
    const activeSection = ALL_TOPICS_DATABASE.find(sec => sec.id === selectedTopicId) || ALL_TOPICS_DATABASE[0];
    
    // Combine featured and questions to render a list under the active selected topic
    const activeTopicQuestions = selectedTopicId && activeSection 
        ? [activeSection.featured, ...activeSection.questions]
        : [];

    // Filter active topic questions based on local search input
    const filteredQuestions = activeTopicQuestions.filter(q => 
        !localSearchTerm || 
        q.title.toLowerCase().includes(localSearchTerm.toLowerCase()) ||
        q.content.toLowerCase().includes(localSearchTerm.toLowerCase())
    );

    // Pagination calculations
    const itemsPerPage = 3;
    const totalPages = Math.ceil(filteredQuestions.length / itemsPerPage) || 1;
    const paginatedQuestions = filteredQuestions.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="bg-[#f4f7fb] min-h-screen text-gray-800">
            {/* Breadcrumb */}
            <div className="bg-white border-b">
                <div className="container mx-auto px-4 py-3">
                    <div className="flex flex-wrap items-center text-sm text-gray-500 gap-1">
                        <Link to="/" className="hover:text-[#0f4c81]">Trang chủ</Link>
                        <span className="text-gray-300">/</span>
                        <Link to="/cau-hoi-phap-luat" className="hover:text-[#0f4c81]">Hỏi đáp pháp luật</Link>
                        <span className="text-gray-300">/</span>
                        <button onClick={() => handleTopicSelect(null, null)} className="hover:text-[#0f4c81]">Chủ đề nổi bật</button>
                        {selectedTopicId && activeSection && (
                            <>
                                <span className="text-gray-300">/</span>
                                <span className="text-gray-900 font-medium truncate max-w-[200px] md:max-w-none">{activeSection.domain}</span>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Header Cấp 1 */}
            <div className="bg-[#1a3b8b] py-6">
                <div className="container mx-auto px-4 max-w-[1280px] flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex-1">
                        <h1 className="text-[28px] font-bold text-white mb-2 relative inline-block">
                            Hỏi đáp pháp luật
                            <div className="absolute -bottom-2 left-0 w-16 h-1 bg-[#fdb714]"></div>
                        </h1>
                        <p className="text-blue-100 text-[14px] mt-4 opacity-90 max-w-2xl">
                            Khám phá các chủ đề pháp lý nổi bật cùng danh sách câu hỏi liên quan được giải đáp chuẩn xác bởi các cơ quan và chuyên gia.
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0 mt-4 md:mt-0">
                        <Link to="/cau-hoi-phap-luat/chuyen-gia" className="border-2 border-white/60 text-white font-bold py-2.5 px-5 rounded-lg hover:bg-white hover:text-[#1a3b8b] transition flex items-center justify-center gap-2 text-[14px]">
                            <User size={18} /> Tư vấn chuyên gia
                        </Link>
                        <button onClick={handleCreateClick} className="bg-white text-[#1a3b8b] font-bold py-2.5 px-6 rounded-lg hover:bg-blue-50 transition flex items-center justify-center gap-2 text-[14px] shadow-sm">
                            <PlusCircle size={18} /> Tạo câu hỏi
                        </button>
                    </div>
                </div>
            </div>

            {/* Navigation Tab Cấp 2 (Sticky Sub-nav) */}
            <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-20 mb-6">
                <div className="container mx-auto px-4 max-w-[1280px] flex gap-2 overflow-x-auto no-scrollbar">
                    <Link
                        to="/cau-hoi-phap-luat?tab=popular"
                        className="px-5 py-3.5 text-[14px] font-bold transition-all border-b-[3px] border-transparent text-gray-500 hover:text-[#1a3b8b] whitespace-nowrap flex items-center gap-2"
                    >
                        <Flame size={16} /> NHIỀU NGƯỜI QUAN TÂM
                    </Link>
                    <Link
                        to="/cau-hoi-phap-luat?tab=latest"
                        className="px-5 py-3.5 text-[14px] font-bold transition-all border-b-[3px] border-transparent text-gray-500 hover:text-[#1a3b8b] whitespace-nowrap flex items-center gap-2"
                    >
                        <Clock size={16} /> MỚI NHẤT
                    </Link>
                    <button
                        onClick={() => handleTopicSelect(null, null)}
                        className="px-5 py-3.5 text-[14px] font-bold transition-all border-b-[3px] border-[#fdb714] text-[#1a3b8b] whitespace-nowrap flex items-center gap-2"
                    >
                        <HelpCircle size={16} /> CHỦ ĐỀ NỔI BẬT
                    </button>
                    <Link
                        to="/cau-hoi-phap-luat?tab=search"
                        className="px-5 py-3.5 text-[14px] font-bold transition-all border-b-[3px] border-transparent text-gray-500 hover:text-[#1a3b8b] whitespace-nowrap flex items-center gap-2"
                    >
                        <Search size={16} /> TÌM KIẾM CÂU HỎI
                    </Link>
                </div>
            </div>

            {/* Popular Topics wrapped grid with "..." toggler */}
            <div className="container mx-auto px-4 max-w-[1280px] mb-8">
                <div className="bg-white p-4 rounded-xl border border-gray-150 shadow-sm">
                    <div className="flex flex-wrap items-center gap-2.5">
                        {displayedTags.map((tag, idx) => {
                            const isActive = selectedTopicId === tag.target;
                            return (
                                <button
                                    key={idx}
                                    onClick={() => handleTopicSelect(tag.target, tag.label)}
                                    className={`px-4 py-2 border text-[13px] font-bold rounded-full transition whitespace-nowrap ${isActive
                                        ? 'bg-[#1a3b8b] text-white border-[#1a3b8b] shadow-sm'
                                        : 'border-gray-200 text-gray-600 bg-gray-50/50 hover:border-[#1a3b8b] hover:text-[#1a3b8b] hover:bg-blue-50/30'
                                        }`}
                                >
                                    {tag.label}
                                </button>
                            );
                        })}
                        
                        {/* "..." Expand/Collapse Button */}
                        <button
                            onClick={() => setShowAllTags(!showAllTags)}
                            className={`px-3 py-2 border rounded-full transition flex items-center justify-center hover:border-[#1a3b8b] hover:text-[#1a3b8b] ${showAllTags
                                ? 'bg-blue-50 border-blue-200 text-[#1a3b8b]'
                                : 'border-gray-200 text-gray-500 bg-gray-50/50'
                                }`}
                            title={showAllTags ? 'Thu gọn chủ đề' : 'Xem tất cả chủ đề'}
                        >
                            {showAllTags ? (
                                <LayoutGrid size={16} className="animate-pulse" />
                            ) : (
                                <MoreHorizontal size={16} />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content Areas */}
            <div className="container mx-auto px-4 max-w-[1280px] pb-16">
                {selectedTopicId === null ? (
                    /* STATE 1: Default View - Shows all topics, exactly ONE question per topic block */
                    <div className="space-y-8">
                        {TOPIC_SECTIONS.map((section) => {
                            return (
                                <section key={section.id} className="bg-white rounded-xl shadow-sm border border-gray-150 p-6 md:p-8 transition hover:shadow-md">
                                    {/* Section Header */}
                                    <div className="flex justify-between items-center pb-4 border-b border-gray-100 mb-6">
                                        <button
                                            onClick={() => {
                                                const matchingTag = POPULAR_TAGS.find(t => t.target === section.id);
                                                handleTopicSelect(section.id, matchingTag?.label || null);
                                            }}
                                            className="text-left group shrink-0"
                                        >
                                            <h2 className="text-lg md:text-xl font-bold text-[#0f4c81] flex items-center gap-3">
                                                <span className="border-l-4 border-[#fdb714] pl-3 leading-tight group-hover:text-blue-700 transition">
                                                    {section.title}
                                                </span>
                                            </h2>
                                        </button>
                                        <button
                                            onClick={() => {
                                                const matchingTag = POPULAR_TAGS.find(t => t.target === section.id);
                                                handleTopicSelect(section.id, matchingTag?.label || null);
                                            }}
                                            className="text-xs md:text-sm font-bold text-[#1a3b8b] hover:text-blue-700 flex items-center gap-1 hover:underline shrink-0 bg-blue-50/50 hover:bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100/50 transition"
                                        >
                                            Xem thêm <ChevronRight size={14} />
                                        </button>
                                    </div>

                                    {/* Section Body: Exactly ONE featured question card */}
                                    <div className="border border-gray-100 rounded-xl overflow-hidden shadow-sm flex flex-col md:flex-row hover:shadow-md transition group">
                                        <div className="relative h-48 md:h-auto md:w-1/3 overflow-hidden bg-gray-100 shrink-0">
                                            <img
                                                src={section.featured.image}
                                                alt={section.featured.title}
                                                className="w-full h-full object-cover transition duration-500 group-hover:scale-103"
                                            />
                                            <div className="absolute top-3 left-3 bg-[#1a3b8b] text-white text-xs font-bold px-2.5 py-1 rounded shadow">
                                                {section.domain}
                                            </div>
                                        </div>
                                        <div className="p-6 flex flex-col justify-between flex-grow">
                                            <div>
                                                <Link to={`/cau-hoi-phap-luat/${section.featured.id}`}>
                                                    <h3 className="font-bold text-lg text-[#0f4c81] group-hover:text-blue-700 transition leading-snug mb-3">
                                                        {section.featured.title}
                                                    </h3>
                                                </Link>
                                                <p className="text-sm text-gray-600 line-clamp-3 mb-6 leading-relaxed">
                                                    "{section.featured.content}"
                                                </p>
                                            </div>
                                            
                                            <div className="pt-4 border-t border-gray-50 flex flex-wrap items-center justify-between text-xs text-gray-500 font-medium gap-3">
                                                <div className="flex items-center gap-2">
                                                    {section.featured.status === 'Đã trả lời' ? (
                                                        <span className="flex items-center gap-1 font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-100">
                                                            <CheckCircle2 size={12} /> Đã giải đáp
                                                        </span>
                                                    ) : (
                                                        <span className="flex items-center gap-1 font-bold text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded border border-amber-100">
                                                            <Clock size={12} /> Chờ trả lời
                                                        </span>
                                                    )}
                                                    {section.featured.isOfficial && (
                                                        <span className="flex items-center gap-1 font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-100" title="Cơ quan nhà nước xác thực">
                                                            <Check size={12} /> Chính thức
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <span className="flex items-center gap-1"><Calendar size={13} /> {section.featured.date}</span>
                                                    <span className="flex items-center gap-1" title="Lượt xem"><Eye size={13} /> {section.featured.views}</span>
                                                    <span className="flex items-center gap-1" title="Lượt thích"><ThumbsUp size={13} /> {section.featured.likes}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            );
                        })}
                    </div>
                ) : (
                    /* STATE 2: Detailed Filter View - Loads list of all questions belonging to that specific topic */
                    <div className="bg-white rounded-xl shadow-sm border border-gray-150 p-6 md:p-8">
                        {/* Detail Header & Return button */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100 mb-6">
                            <button
                                onClick={() => handleTopicSelect(null, null)}
                                className="inline-flex items-center gap-2 text-sm font-bold text-[#1a3b8b] hover:text-blue-700 bg-blue-50/50 hover:bg-blue-50 py-2 px-4 rounded-lg border border-blue-100 transition max-w-max"
                            >
                                <ArrowLeft size={16} /> Quay lại Tất cả chủ đề
                            </button>
                            <span className="text-xs font-bold text-gray-500 uppercase bg-gray-100 px-3 py-1.5 rounded-lg">
                                Lĩnh vực: {activeSection?.domain || ''}
                            </span>
                        </div>

                        <div className="mb-8">
                            <h2 className="text-xl md:text-2xl font-bold text-[#0f4c81] flex items-center gap-3">
                                <span className="border-l-4 border-[#fdb714] pl-3 leading-tight">
                                    {activeSection?.title || ''}
                                </span>
                            </h2>
                            <p className="text-sm text-gray-500 mt-2 pl-4">
                                Tổng cộng {filteredQuestions.length} câu hỏi {localSearchTerm ? 'phù hợp' : 'thuộc chuyên mục này'} đã được đăng tải và trả lời.
                            </p>
                        </div>

                        {/* Local Topic Search Bar */}
                        <div className="mb-6 bg-gray-50 p-4 rounded-xl border border-gray-150 flex flex-col sm:flex-row gap-3">
                            <div className="relative flex-1">
                                <input
                                    type="text"
                                    value={localSearchTerm}
                                    onChange={(e) => {
                                        setLocalSearchTerm(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                    placeholder={`Tìm kiếm câu hỏi trong chủ đề ${activeSection?.domain || ''}...`}
                                    className="w-full border border-gray-200 rounded-lg py-2.5 pl-4 pr-10 focus:border-[#0f4c81] outline-none transition text-sm bg-white hover:border-gray-300 shadow-sm"
                                />
                                <Search className="absolute right-3 top-3 text-[#0f4c81] opacity-60" size={18} />
                            </div>
                            {localSearchTerm && (
                                <button
                                    onClick={() => {
                                        setLocalSearchTerm('');
                                        setCurrentPage(1);
                                    }}
                                    className="text-xs font-bold text-red-500 hover:text-red-700 hover:underline shrink-0 sm:self-center bg-red-50 border border-red-100 py-2 px-3 rounded-lg transition"
                                >
                                    Xóa tìm kiếm
                                </button>
                            )}
                        </div>

                        {/* List of questions under this active topic */}
                        {paginatedQuestions.length > 0 ? (
                            <>
                                <ul className="divide-y divide-gray-100">
                                    {paginatedQuestions.map((q) => (
                                        <li key={q.id} className="py-6 hover:bg-blue-50/20 px-4 -mx-4 rounded-xl transition-colors group">
                                            <div className="flex flex-col md:flex-row gap-6 items-start">
                                                {/* Optional image/thumbnail on the left */}
                                                <div className="w-full md:w-32 h-20 rounded-lg overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
                                                    <img
                                                        src={q.image}
                                                        alt={q.title}
                                                        className="w-full h-full object-cover group-hover:scale-103 transition duration-300"
                                                    />
                                                </div>

                                                <div className="flex-grow">
                                                    <div className="flex items-start justify-between gap-4 mb-2">
                                                        <Link to={`/cau-hoi-phap-luat/${q.id}`}>
                                                            <h3 className="font-bold text-lg text-[#0f4c81] group-hover:text-blue-700 transition leading-snug line-clamp-2">
                                                                {q.title}
                                                            </h3>
                                                        </Link>
                                                        <span className="shrink-0 bg-blue-50 text-[#0f4c81] text-xs font-bold px-2.5 py-1 rounded-full border border-blue-100">
                                                            {activeSection?.domain || ''}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed mb-4">
                                                        "{q.content}"
                                                    </p>

                                                    <div className="flex flex-wrap items-center justify-between text-xs text-gray-500 font-medium gap-3">
                                                        <div className="flex items-center gap-2">
                                                            {q.status === 'Đã trả lời' ? (
                                                                <span className="flex items-center gap-1 font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                                                                    <CheckCircle2 size={12} /> Đã giải đáp
                                                                </span>
                                                            ) : (
                                                                <span className="flex items-center gap-1 font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-100">
                                                                    <Clock size={12} /> Chờ trả lời
                                                                </span>
                                                            )}
                                                            {q.isOfficial && (
                                                                <span className="flex items-center gap-1 font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                                                                    <Check size={12} /> Chính thức
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div className="flex items-center gap-4">
                                                            <span className="flex items-center gap-1"><Calendar size={13} /> {q.date}</span>
                                                            {q.author && <span className="flex items-center gap-1"><User size={13} /> {q.author}</span>}
                                                            <span className="flex items-center gap-1"><Eye size={13} /> {q.views} lượt xem</span>
                                                            <span className="flex items-center gap-1"><ThumbsUp size={13} /> {q.likes} hữu ích</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>

                                {/* Pagination UI */}
                                <div className="p-4 mt-6 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-gray-100 bg-gray-50/50 rounded-xl">
                                    <span className="text-gray-500 text-sm font-medium">
                                        Hiển thị {Math.min(filteredQuestions.length, (currentPage - 1) * itemsPerPage + 1)} - {Math.min(filteredQuestions.length, currentPage * itemsPerPage)} của {filteredQuestions.length} kết quả
                                    </span>
                                    <div className="flex gap-2">
                                        <button 
                                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                            disabled={currentPage === 1}
                                            className={`px-3 py-1.5 border rounded-lg font-medium text-sm transition ${
                                                currentPage === 1 
                                                ? 'text-gray-400 bg-gray-100 border-gray-200 cursor-not-allowed' 
                                                : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-200'
                                            }`}
                                        >
                                            Trang trước
                                        </button>
                                        {Array.from({ length: totalPages }).map((_, pageIdx) => {
                                            const pageNum = pageIdx + 1;
                                            const isCurrent = currentPage === pageNum;
                                            return (
                                                <button
                                                    key={pageNum}
                                                    onClick={() => setCurrentPage(pageNum)}
                                                    className={`px-3 py-1.5 border rounded-lg font-medium text-sm transition shadow-sm ${
                                                        isCurrent
                                                        ? 'bg-[#0f4c81] text-white border-[#0f4c81]'
                                                        : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-200'
                                                    }`}
                                                >
                                                    {pageNum}
                                                </button>
                                            );
                                        })}
                                        <button 
                                            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                            disabled={currentPage === totalPages}
                                            className={`px-3 py-1.5 border rounded-lg font-medium text-sm transition ${
                                                currentPage === totalPages 
                                                ? 'text-gray-400 bg-gray-100 border-gray-200 cursor-not-allowed' 
                                                : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-200'
                                            }`}
                                        >
                                            Trang sau
                                        </button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="text-center py-16 px-4 bg-gray-50/50 rounded-xl border border-dashed border-gray-200">
                                <Search className="mx-auto text-gray-300 mb-3" size={36} />
                                <h4 className="font-bold text-gray-700 mb-1">Không tìm thấy kết quả</h4>
                                <p className="text-sm text-gray-500 max-w-sm mx-auto">
                                    Không tìm thấy câu hỏi nào phù hợp với từ khóa "{localSearchTerm}" trong chủ đề này.
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Q&A Modal */}
            <CreateCauHoiModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
        </div>
    );
};

export default ChuDeHoiDapPage;

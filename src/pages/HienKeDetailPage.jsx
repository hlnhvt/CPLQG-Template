import React, { useState, useRef } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { MOCK_DETAILS } from './HienKeShared';
import {
    ChevronRight, ArrowLeft, ArrowUp, Calendar, Users, Building2,
    FileText, Download, Paperclip, Send, MessageSquare, Clock,
    CheckCircle2, ExternalLink, Eye, File, FileCode2, Upload, X,
    User, Mail, Phone, TrendingUp, Scale, Heart, Landmark, ChevronUp,
    Video, Mic2, ThumbsUp, ThumbsDown, Share2, BookOpen, AlertCircle,
    Bookmark, Flame
} from 'lucide-react';

// ======================== MOCK DATA FOR INDIVIDUAL IDEAS ========================
const MOCK_PROCESS_RECORDS = [
    {
        id: "HK-2026-089",
        title: "Đề xuất đơn giản hóa thủ tục cấp giấy phép xây dựng trực tuyến mức độ 4",
        sender: "Nguyễn Văn A (Đại diện Doanh nghiệp)",
        field: "Xây dựng",
        receiveDate: "10/05/2026",
        status: "completed",
        statusText: "Đã xử lý & tiếp thu",
        agency: "Bộ Xây dựng",
        excerpt: "Cần xây dựng chuẩn dữ liệu chung đồng bộ và bảo mật giữa các bệnh viện tuyến tỉnh và tuyến trung ương trên toàn quốc.",
        tags: ["Xây dựng", "Thủ tục hành chính"],
        type: "hien-ke-cua-ban"
    },
    {
        id: "HK-2026-088",
        title: "Giải pháp ứng dụng AI trong phân loại rác thải tại nguồn và ưu đãi thuế sinh thái",
        sender: "Trần Thị B",
        field: "Tài nguyên & Môi trường",
        receiveDate: "08/05/2026",
        status: "processing",
        statusText: "Đang nghiên cứu xử lý",
        agency: "Bộ Tài nguyên và Môi trường",
        excerpt: "Quy trình đấu thầu thuốc hiện nay kéo dài qua nhiều cấp xét duyệt gây ra tình trạng thiếu thuốc cục bộ tại các bệnh viện.",
        tags: ["Môi trường", "AI"],
        type: "co-the-ban-quan-tam"
    },
    {
        id: "HK-2026-085",
        title: "Kiến nghị tích hợp thẻ BHYT vào ứng dụng VNeID trong quy trình khám chữa bệnh tuyến xã",
        sender: "Lê Văn C",
        field: "Y tế",
        receiveDate: "05/05/2026",
        status: "completed",
        statusText: "Đã xử lý & tiếp thu",
        agency: "Bộ Y tế & BHXH Việt Nam",
        excerpt: "Học sinh tiểu học hiện đang phải tiếp thu một khối lượng kiến thức quá lớn và hàn lâm so với độ tuổi.",
        tags: ["Y tế", "Số hóa"],
        type: "co-the-ban-quan-tam"
    },
    {
        id: "HK-2026-082",
        title: "Cơ chế miễn giảm thuế TNDN cho các startup công nghệ mảng Nông nghiệp thông minh",
        sender: "Phạm Minh D",
        field: "Tài chính",
        receiveDate: "02/05/2026",
        status: "received",
        statusText: "Đã tiếp nhận phân loại",
        agency: "Bộ Tài chính",
        excerpt: "Với tốc độ đô thị hoá nhanh, lượng lớn dân cư tại các khu đô thị mới ven rìa các tỉnh thành đang bị thiếu hụt.",
        tags: ["Tài chính", "Startup"],
        type: "hien-ke-cua-ban"
    },
    {
        id: "HK-2026-079",
        title: "Sửa đổi quy định về giờ làm việc ngoài giờ cho lao động ngành gia công xuất khẩu",
        sender: "Hiệp hội Dệt may",
        field: "Lao động - TB&XH",
        receiveDate: "28/04/2026",
        status: "processing",
        statusText: "Đang nghiên cứu xử lý",
        agency: "Bộ Lao động - TB&XH",
        excerpt: "Để hạn chế tình trạng cò đất thao túng thị trường và gây nên các cơn sốt đất ảo, cần tiến hành quy định khắt khe.",
        tags: ["Lao động", "Chính sách"],
        type: "hien-ke-cua-ban"
    },
    {
        id: "HK-2026-075",
        title: "Cải cách thủ tục đăng ký kinh doanh cho hộ kinh doanh cá thể",
        sender: "Lê Thị E",
        field: "Kinh tế",
        receiveDate: "25/04/2026",
        status: "received",
        statusText: "Đã tiếp nhận",
        agency: "Bộ Kế hoạch và Đầu tư",
        excerpt: "Thủ tục đăng ký kinh doanh hiện nay vẫn còn rườm rà đối với các hộ kinh doanh nhỏ lẻ ở vùng nông thôn.",
        tags: ["Kinh tế", "Thủ tục"],
        type: "co-the-ban-quan-tam"
    }
];

const getIndividualIdea = (id, state) => {
    // Exact requested y te liên thông dữ liệu template for ID 30
    if (id === '30' || id === 30) {
        return {
            title: 'Đề xuất giải pháp liên thông dữ liệu y tế quốc gia',
            domain: 'Sức khỏe và Y tế',
            status: 'Đã phản hồi',
            author: 'Nguyễn Văn An',
            date: '11:09 17/03/2026',
            views: 3821,
            content: `Kính gửi các Lãnh đạo và Cơ quan chức năng,
            
Qua quan sát thực tiễn quá trình khám chữa bệnh tại các bệnh viện tuyến cơ sở và tuyến trung ương, tôi nhận thấy có sự lãng phí rất lớn về thời gian và tiền bạc của người bệnh khi phải thực hiện lại nhiều xét nghiệm cơ bản mang tính lặp lại mỗi khi chuyển tuyến.

**Tôi xin đề xuất giải pháp như sau:**
1. Cần xây dựng và Ban hành Chuẩn dữ liệu y tế điện tử quốc gia chung, yêu cầu tất cả các nền tảng phần mềm HIS (Hospital Information System) tại các bệnh viện phải tuân thủ và có API chia sẻ.
2. Dữ liệu này sẽ được gắn với mã định danh cá nhân (CCCD gắn chip) để người dân có thể có một "Hồ sơ sức khoẻ trọn đời".
3. Khi chuyển viện, bác sĩ ở bệnh viện mới có thể lập tức tra cứu và công nhận kết quả của các nhóm xét nghiệm hạng 1 (như sinh hoá máu cơ bản, X-Quang...) trong vòng 7 ngày gần nhất.

Tôi tin rằng giải pháp này không chỉ tháo gỡ tắc nghẽn, giảm tải cho các bệnh viện tuyến trên mà còn là một bước tiến quan trọng trong công cuộc Chuyển đổi số quốc gia lĩnh vực Y tế.
            
Xin trân trọng cảm ơn!`,
            attachments: [
                { name: 'Du_thao_Mo_hinh_Lienthong.pdf', size: '2.5 MB' },
                { name: 'So_lieu_khao_sat_y_te.xlsx', size: '1.2 MB' }
            ]
        };
    }

    // Process record lookup (HK-...)
    if (typeof id === 'string' && id.startsWith('HK-')) {
        const proc = MOCK_PROCESS_RECORDS.find(r => r.id === id);
        if (proc) {
            return {
                title: proc.title,
                domain: proc.field,
                status: proc.status === 'completed' ? 'Đã phản hồi' : 'Đang xử lý',
                author: proc.sender,
                date: proc.receiveDate + ' 09:00',
                views: 1250,
                content: `Kính gửi các Lãnh đạo và Cơ quan chức năng,\n\nTôi xin gửi hiến kế liên quan đến: ${proc.title}.\n\nChi tiết kiến nghị:\n${proc.excerpt}\n\nRất mong cơ quan ban ngành xem xét, phản hồi sớm để hoàn thiện quy định.\n\nTrân trọng cảm ơn!`,
                attachments: [
                    { name: `Tai_lieu_dinh_kem_${id}.pdf`, size: '1.5 MB' }
                ]
            };
        }
    }

    // Deterministic fallback for any other numeric ID
    const numId = parseInt(id) || 1;
    const allTemplates = [
        { t: 'Đề xuất giải pháp liên thông dữ liệu y tế quốc gia', d: 'Sức khỏe và Y tế', e: 'Cần xây dựng chuẩn dữ liệu chung đồng bộ và bảo mật giữa các bệnh viện tuyến tỉnh và tuyến trung ương.' },
        { t: 'Kiến nghị sửa đổi quy định về đấu thầu thuốc tập trung', d: 'Sức khỏe và Y tế', e: 'Quy trình đấu thầu thuốc hiện nay kéo dài qua nhiều cấp xét duyệt gây ra tình trạng thiếu thuốc cục bộ tại các bệnh viện.' },
        { t: 'Giải pháp nâng cao chất lượng y tế học đường', d: 'Sức khỏe và Y tế', e: 'Đẩy mạnh tập huấn sơ cấp cứu cơ bản và kỹ năng xử lý chấn thương cho giáo viên và trang bị tủ thuốc y tế dự phòng.' },
        { t: 'Kiến nghị giảm tải nội dung sách giáo khoa cấp tiểu học', d: 'Giáo dục và Đào tạo', e: 'Học sinh tiểu học hiện đang phải tiếp thu một khối lượng kiến thức quá lớn và hàn lâm so với độ tuổi.' },
        { t: 'Đề xuất cơ chế hỗ trợ tài chính cho giáo viên vùng sâu', d: 'Giáo dục và Đào tạo', e: 'Phụ cấp bám bản và phụ cấp điểm trường hiện tại chưa phản ánh đúng sự cống hiến và không đủ sức giữ chân giáo viên.' },
        { t: 'Sáng kiến phát triển mạng lưới hướng nghiệp cho học sinh THPT', d: 'Giáo dục và Đào tạo', e: 'Học sinh cấp 3 thường thiếu thông tin thực tiễn và chọn sai nghề, cần tham quan thực tế doanh nghiệp.' },
        { t: 'Đề xuất mở rộng mạng lưới xe buýt trợ giá ra khu vực ven đô', d: 'Giao thông vận tải', e: 'Với tốc độ đô thị hoá nhanh, lượng lớn dân cư tại các khu đô thị mới ven rìa đang bị thiếu hụt xe buýt.' },
        { t: 'Kiến nghị áp dụng công nghệ AI vào phạt nguội vi phạm', d: 'Giao thông vận tải', e: 'Triển khai mạnh mẽ mạng lưới hệ thống camera tích hợp AI để tự động phát hiện vi phạm giao thông.' },
        { t: 'Kiến nghị siết chặt quản lý môi giới bất động sản', d: 'Bất động sản', e: 'Yêu cầu tất cả môi giới cá nhân phải trải qua đào tạo thi sát hạch để được cấp chứng chỉ hành nghề chính quy.' },
        { t: 'Giải pháp thúc đẩy phát triển nhà ở xã hội cho công nhân', d: 'Bất động sản', e: 'Ban hành gói tín dụng ưu đãi với mức lãi suất vay cố định dưới 4% mỗi năm, trả góp kéo dài 15-20 năm.' },
        { t: 'Đề xuất phân loại rác thải tại nguồn có thưởng - phạt rõ ràng', d: 'Môi trường và Khí hậu', e: 'Áp dụng cơ chế đánh thuế tiền thu gom rác theo chính khối lượng rác vô cơ không tái chế được.' },
        { t: 'Đề xuất miễn thuế khoán cho tiểu thương có hoàn cảnh khó khăn', d: 'Kinh tế và Đời sống', e: 'Chính sách miễn giảm một phần hoặc toàn bộ thuế khoán nhằm nuôi dưỡng nguồn thu cho hộ kinh doanh nhỏ.' }
    ];

    const template = allTemplates[numId % allTemplates.length];
    const authorNames = [
        'Nguyễn Văn An', 'Trần Thị Nhàn', 'Lê Hoàng Bách', 'Phạm Quỳnh Như',
        'Hoàng Anh Tuấn', 'Đặng Tuấn Phong', 'Vũ Thị Thanh', 'Đỗ Minh Trí',
        'Phan Ngọc Hải', 'Ngô Thu Thảo', 'Bùi Văn Hùng', 'Lý Quang Cường'
    ];
    const author = authorNames[numId % authorNames.length];
    const isResponded = state?.status === 'Đã phản hồi' || (numId % 3 !== 0);

    return {
        title: template.t,
        domain: template.d,
        status: isResponded ? 'Đã phản hồi' : 'Chờ phản hồi',
        author: author,
        date: `10:30 15/03/2026`,
        views: 120 + (numId * 17) % 500,
        content: `Kính gửi các Lãnh đạo và Cơ quan chức năng,\n\nTôi tên là ${author}, xin phép gửi đóng góp ý kiến về chủ đề: **${template.t}**.\n\n${template.e}\n\nRất mong cơ quan quản lý ban ngành xem xét, có phản hồi tích cực và sớm đưa vào thực tế áp dụng để hỗ trợ cộng đồng, doanh nghiệp.\n\nXin trân trọng cảm ơn!`,
        attachments: [
            { name: `Kien_nghi_chi_tiet_so_${id}.pdf`, size: '1.8 MB' }
        ]
    };
};

const getAnswerData = (idea) => {
    const agencies = {
        'Sức khỏe và Y tế': 'Cục Quản lý Khám, chữa bệnh',
        'Giáo dục và Đào tạo': 'Bộ Giáo dục và Đào tạo',
        'Giao thông vận tải': 'Sở Giao thông Vận tải',
        'Bất động sản': 'Bộ Xây dựng',
        'Môi trường và Khí hậu': 'Cục Kiểm soát ô nhiễm môi trường',
        'Kinh tế và Đời sống': 'Cục Thuế địa phương'
    };
    const agencyName = agencies[idea.domain] || 'Cục Quản lý Khám, chữa bệnh';

    if (idea.title.includes('y tế quốc gia') || idea.title.includes('liên thông dữ liệu')) {
        return {
            expertName: 'Cục Quản lý Khám, chữa bệnh',
            expertRole: 'Cơ quan, tổ chức tiếp nhận xử lý',
            expertType: 'Cơ quan nhà nước',
            date: '09:30 19/03/2026',
            likes: 850,
            content: `Chào bạn ${idea.author},
            
Bộ Y tế cảm ơn ý kiến đóng góp hết sức thiết thực và tâm huyết của bạn đối với lĩnh vực Chuyển đổi số hệ thống y tế quốc gia. Về nội dung bạn nêu, Bộ xin có các phản hồi như sau:

**1. Về tiến độ triển khai liên thông dữ liệu**
Bộ Y tế hoàn toàn đồng tình với sự thành lập một chuẩn dữ liệu chung. Thực tế, Bộ Y tế hiện đang tích cực làm việc với Bộ Công an để đẩy mạnh Đề án 06. Dự kiến trong cuối năm 2026, Hồ sơ sức khoẻ điện tử sẽ được liên thông và hiển thị thống nhất trên ứng dụng VNeID của người dân. Các chuẩn dữ liệu API dùng chung giữa các nền tảng HIS đang trong giai đoạn thẩm định cuối cùng trước khi ban hành Quy chuẩn.

**2. Về công nhận kết quả xét nghiệm liên tuyến**
Đây là một vấn đề đã được Bộ Y tế lưu tâm. Căn cứ theo tinh thần của Luật Khám bệnh, chữa bệnh (sửa đổi), Bộ đã có Thông tư quy định về việc các cơ sở y tế đủ năng lực/tiêu chuẩn phải công nhận kết quả của nhau nhằm ngăn chặn tình trạng tư lợi, lạm dụng xét nghiệm.

Đóng góp của bạn đã được Cục Quản lý Khám, chữa bệnh tiếp thu và sẽ làm tài liệu tham khảo quan trọng trong quá trình soạn thảo Nghị định hướng dẫn sắp tới.

Trân trọng nể trọng!`,
            references: ['Luật Khám bệnh, chữa bệnh 2023', 'Đề án 06/CP'],
            attachments: []
        };
    }

    return {
        expertName: agencyName,
        expertRole: 'Cơ quan, tổ chức tiếp nhận xử lý',
        expertType: 'Cơ quan nhà nước',
        date: '10:00 18/03/2026',
        likes: 124,
        content: `Chào bạn ${idea.author},

Chúng tôi chân thành cảm ơn đóng góp rất thiết thực và kịp thời của bạn về vấn đề: "${idea.title}".

Cơ quan chúng tôi đã tiếp nhận nội dung hiến kế của bạn. Ý kiến này đã được chuyển đến bộ phận chuyên môn nghiên cứu, đánh giá tính khả thi và sự phù hợp thực tiễn. Chúng tôi đánh giá rất cao tinh thần chủ động đóng góp xây dựng chính sách của bạn.

Thông tin phản hồi chính thức sẽ tiếp tục được cập nhật tới bạn khi có kết quả thẩm định chi tiết.

Trân trọng!`,
        references: ['Nghị định hướng dẫn thi hành luật liên quan'],
        attachments: []
    };
};

// ======================== MOCK DATA ========================
const MOCK_CONSULTATION = {
    id: 1,
    title: 'Góp ý Dự thảo Luật Đất đai (Sửa đổi)',
    summary: 'Bộ Tài nguyên và Môi trường lấy ý kiến nhân dân, tổ chức về các quy định trong dự thảo Luật Đất đai sửa đổi nhằm hoàn thiện chính sách quản lý, sử dụng đất đai phù hợp với thực tiễn.',
    agency: 'Bộ Tài nguyên và Môi trường',
    agencyShort: 'BTNMT',
    agencyLogo: null,
    status: 'open', // open | upcoming | closed
    startDate: '01/03/2026',
    endDate: '30/04/2026',
    lastUpdated: '01/03/2026',
    views: 3821,
    participants: 3821,
    category: 'Vấn đề nổi bật',
    domain: 'Pháp luật dân sự',
    thumb: '/images/thumb1.png',
    sections: [
        {
            id: 'gioi-thieu',
            label: 'A. Giới thiệu',
            content: [
                'Bộ Tài nguyên và Môi trường trân trọng mời các cơ quan, tổ chức, cá nhân tham gia đóng góp ý kiến vào Dự thảo Luật Đất đai (sửa đổi).',
                'Luật Đất đai là đạo luật quan trọng, có tác động sâu rộng đến mọi mặt của đời sống kinh tế - xã hội, quốc phòng, an ninh và môi trường; là cơ sở pháp lý quan trọng để Nhà nước thực hiện quyền đại diện chủ sở hữu toàn dân về đất đai.',
            ]
        },
        {
            id: 'boi-canh',
            label: 'B. Bối cảnh',
            content: [
                'Luật Đất đai năm 2013 sau hơn 10 năm thi hành đã bộc lộ nhiều hạn chế, bất cập cần được sửa đổi, bổ sung để phù hợp với yêu cầu phát triển mới.',
                'Nghị quyết số 18-NQ/TW ngày 16/6/2022 của Hội nghị lần thứ năm Ban Chấp hành Trung ương Đảng khóa XIII "về tiếp tục đổi mới, hoàn thiện thể chế, chính sách, nâng cao hiệu lực, hiệu quả quản lý và sử dụng đất, tạo động lực đưa nước ta trở thành nước phát triển có thu nhập cao" đặt ra định hướng quan trọng cho việc sửa đổi Luật Đất đai.',
                'Dự thảo Luật Đất đai (sửa đổi) được xây dựng trên cơ sở tổng kết, đánh giá kết quả thi hành Luật Đất đai năm 2013 và quán triệt đầy đủ, toàn diện Nghị quyết số 18-NQ/TW.',
            ]
        },
        {
            id: 'cac-kien-nghi',
            label: 'C. Các kiến nghị chính',
            content: [
                'Dự thảo tập trung vào các nhóm vấn đề chính sau:',
            ],
            bullets: [
                'Hoàn thiện các quy định về quyền và nghĩa vụ của người sử dụng đất',
                'Đổi mới, hoàn thiện cơ chế định giá đất, đảm bảo nguyên tắc thị trường',
                'Hoàn thiện quy định về thu hồi đất, bồi thường, hỗ trợ, tái định cư',
                'Đẩy mạnh phân cấp, phân quyền trong quản lý đất đai',
                'Hoàn thiện quy định về tư vấn, phản biện, giám sát xã hội trong quản lý đất đai',
            ]
        },
        {
            id: 'phan-hoi',
            label: 'D. Những vấn đề cần phản hồi',
            content: [
                'Bộ Tài nguyên và Môi trường mong muốn nhận được ý kiến đóng góp của Quý vị về các nội dung sau:',
            ],
            bullets: [
                'Tính hợp lý và khả thi của các quy định về quyền tiếp cận đất đai',
                'Cơ chế giải quyết tranh chấp đất đai mới',
                'Quy định về đất ở, đất nông nghiệp trong và ngoài khu vực đô thị',
                'Chính sách tài chính đất đai và định giá đất',
                'Các nội dung khác trong dự thảo mà Quý vị quan tâm',
            ]
        },
    ],
    attachments: [
        { id: 1, name: 'Du_thao_Luat_Dat_dai_sua_doi_2026.pdf', size: '4.2 MB', type: 'PDF' },
        { id: 2, name: 'To_trinh_so_XX_TTg_ve_du_an.docx', size: '1.1 MB', type: 'DOCX' },
        { id: 3, name: 'Bao_cao_danh_gia_tac_dong.pdf', size: '2.8 MB', type: 'PDF' },
        { id: 4, name: 'Phieu_lay_y_kien_cong_dong.xlsx', size: '380 KB', type: 'XLSX' },
    ],
    relatedConsultations: [
        { id: 2, title: 'Góp ý chính sách nhà ở xã hội cho công nhân', status: 'open', agency: 'Bộ Xây dựng', deadline: '15/04/2026' },
        { id: 3, title: 'Quy hoạch tổng thể quốc gia 2021–2030', status: 'upcoming', agency: 'Bộ Kế hoạch và Đầu tư', deadline: '01/05/2026' },
        { id: 4, title: 'Lấy ý kiến về sửa đổi Luật Nhà ở', status: 'open', agency: 'Bộ Xây dựng', deadline: '20/04/2026' },
    ],
    comments: [
        { id: 1, user: 'Nguyễn Văn A', org: 'Công ty BĐS XYZ', date: '15/03/2026 09:30', content: 'Đề nghị làm rõ quy định về thời hạn sử dụng đất đối với đất ở đô thị, tránh gây ra bất ổn cho người dân đã mua nhà gắn liền với quyền sử dụng đất.' },
        { id: 2, user: 'Trần Thị Bình', org: 'Hiệp hội Bất động sản', date: '14/03/2026 14:15', content: 'Cơ chế định giá đất theo giá thị trường là đúng hướng nhưng cần có hướng dẫn chi tiết hơn về phương pháp xác định giá thị trường và đơn vị tư vấn định giá.' },
        { id: 3, user: 'Lê Minh Tuấn', date: '13/03/2026 11:00', content: 'Cần bổ sung quy định bảo vệ quyền lợi của người nông dân khi thu hồi đất nông nghiệp phục vụ phát triển kinh tế - xã hội.' },
    ],
    relatedEvents: [
        { id: 'e1', title: 'Diễn đàn trực tuyến: Tác động của Luật Đất đai lên thị trường BĐS', type: 'forum', date: '10/04/2026', color: 'text-blue-600', bg: 'bg-blue-50', to: '/dien-dan/chu-de/1', thumbnail: '/thumbnails/forum_dat_dai.png' },
        { id: 'e2', title: 'Tọa đàm: Gỡ vướng pháp lý trong bồi thường tái định cư', type: 'event', date: '15/04/2026', color: 'text-purple-600', bg: 'bg-purple-50', to: '/dien-dan/su-kien/toa-dam-1', thumbnail: '/thumbnails/toadan_phapluat.png' },
        { id: 'e3', title: 'Livestream: Giải đáp thắc mắc về bảng giá đất mới', type: 'stream', date: '20/04/2026', color: 'text-red-600', bg: 'bg-red-50', to: '/dien-dan/su-kien/livestream-1', thumbnail: '/thumbnails/livestream_giabangdat.png' },
    ]
};

const OTHER_PAGES = [
    { id: 10, title: 'Góp ý chính sách nhà ở xã hội cho công nhân' },
    { id: 11, title: 'Quy hoạch tổng thể quốc gia 2021–2030' },
    { id: 12, title: 'Chính sách phát triển kinh tế tuần hoàn' },
];

// ======================== STATUS BADGE ========================
const StatusBadge = ({ status, large = false }) => {
    const size = large ? 'text-[13px] px-3 py-1.5' : 'text-[12px] px-2.5 py-1';
    if (status === 'open') return (
        <span className={`inline-flex items-center gap-1.5 font-bold ${size} bg-green-50 text-green-700 border border-green-200 rounded-full`}>
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shrink-0" />
            Đang mở
        </span>
    );
    if (status === 'upcoming') return (
        <span className={`inline-flex items-center gap-1.5 font-bold ${size} bg-amber-50 text-amber-700 border border-amber-200 rounded-full`}>
            <span className="w-2 h-2 bg-amber-400 rounded-full shrink-0" />
            Sắp mở
        </span>
    );
    return (
        <span className={`inline-flex items-center gap-1.5 font-bold ${size} bg-gray-100 text-gray-500 border border-gray-200 rounded-full`}>
            <span className="w-2 h-2 bg-gray-400 rounded-full shrink-0" />
            Đã kết thúc
        </span>
    );
};

// ======================== MAIN PAGE ========================
const HienKeDetailPage = () => {
    const { id } = useParams();
    const location = useLocation();
    const { user } = useAuth();

    // Shared States
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [hasLiked, setHasLiked] = useState(false);
    const [hasDisliked, setHasDisliked] = useState(false);

    // Consultation Layout States
    const [commentText, setCommentText] = useState('');
    const [commentSuccess, setCommentSuccess] = useState(false);
    const [isLoggedIn] = useState(false);
    const [attachedFiles, setAttachedFiles] = useState([]);
    const [submittedComments, setSubmittedComments] = useState([]);
    const fileInputRef = useRef(null);

    // Data Routing
    const isConsultation = ['h1', 'h2', 'h3', 'h4', 'nb1', 'nb2', 'nb3', 'nb4', 'nb5', 'nb6'].includes(id);

    // Consultation data
    const data = MOCK_DETAILS[id] || MOCK_DETAILS['h2'];

    // Individual Idea data
    const hienKeData = getIndividualIdea(id, location.state);
    const answerData = getAnswerData(hienKeData);
    const isTrackingId = id && id.toString().startsWith('HK-');
    const showAnswer = hienKeData.status === 'Đã phản hồi' && !isTrackingId;
    const relatedIdeas = [
        { id: 2, title: 'Kiến nghị sửa đổi quy định về đấu thầu thuốc tập trung' },
        { id: 3, title: 'Giải pháp nâng cao chất lượng y tế học đường' },
        { id: 4, title: 'Đề xuất cơ chế chi trả BHYT cho dịch vụ tư vấn tâm lý' }
    ];

    const allComments = [...submittedComments, ...data.comments];

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        let valid = [];
        for (const f of files) {
            if (attachedFiles.length + valid.length >= 5) break;
            if (f.size > 10 * 1024 * 1024) continue;
            valid.push(f);
        }
        setAttachedFiles(prev => [...prev, ...valid]);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleSubmit = () => {
        if (!commentText.trim()) return;
        setSubmittedComments(prev => [{
            id: Date.now(),
            user: 'Người dùng',
            content: commentText,
            date: 'Vừa xong',
        }, ...prev]);
        setCommentText('');
        setAttachedFiles([]);
        setCommentSuccess(true);
    };

    const handleFeedback = (type) => {
        if (!user) {
            alert('Vui lòng đăng nhập để đánh giá.');
            return;
        }
        if (type === 'like') {
            setHasLiked(!hasLiked);
            if (hasDisliked) setHasDisliked(false);
        } else {
            setHasDisliked(!hasDisliked);
            if (hasLiked) setHasLiked(false);
        }
    };

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    if (!isConsultation) {
        return (
            <div className="bg-[#f8f9fa] min-h-screen pb-16 text-gray-800">
                {/* Breadcrumb */}
                <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10 font-sans">
                    <div className="container mx-auto px-4 md:px-8 max-w-[1200px] py-4">
                        <div className="flex flex-wrap items-center text-[13px] font-semibold text-gray-500 gap-1.5">
                            <Link to="/" className="hover:text-[#1e3a8a] transition-colors">Trang chủ</Link>
                            <ChevronRight size={14} className="text-gray-400" />
                            <Link to="/hien-ke" className="hover:text-[#1e3a8a] transition-colors">Hiến kế xây dựng và thi hành pháp luật</Link>
                            <ChevronRight size={14} className="text-gray-400" />
                            <Link to="/hien-ke/linh-vuc" className="hover:text-[#1e3a8a] transition-colors">Có thể bạn quan tâm</Link>
                            <ChevronRight size={14} className="text-gray-400" />
                            <span className="text-[#1e3a8a] font-bold line-clamp-1 max-w-[200px] lg:max-w-none">{hienKeData.domain}</span>
                            <ChevronRight size={14} className="text-gray-400" />
                            <span className="text-gray-400 font-medium">Chi tiết hiến kế</span>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-4 md:px-8 max-w-[1200px] mt-8 flex flex-col lg:flex-row gap-8 items-start font-sans">
                    {/* Main Content Area */}
                    <div className="lg:w-3/4 space-y-6">
                        {/* Idea Box */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="p-6 md:p-8">
                                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                                    <span className="bg-blue-50 text-blue-700 border border-blue-100 px-3 py-1.5 rounded text-[13px] font-bold tracking-wide flex items-center gap-1.5">
                                        {hienKeData.domain}
                                    </span>
                                    <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded font-bold text-[13px] ${hienKeData.status === 'Đã phản hồi' ? 'text-emerald-700 bg-emerald-50 border border-emerald-100' : 'text-amber-700 bg-amber-50 border border-amber-100'}`}>
                                        {hienKeData.status === 'Đã phản hồi' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                                        {hienKeData.status}
                                    </span>
                                </div>

                                <h1 className="text-2xl md:text-[28px] font-bold text-[#1e3a8a] mb-6 leading-tight">
                                    {hienKeData.title}
                                </h1>

                                <div className="flex flex-wrap items-center gap-5 text-[13px] text-gray-500 font-medium mb-6 pb-6 border-b border-gray-100">
                                    <span className="flex items-center gap-1.5"><User size={16} className="text-gray-400" /> {hienKeData.author}</span>
                                    <span className="flex items-center gap-1.5"><Clock size={16} className="text-gray-400" /> {hienKeData.date}</span>
                                    <span className="flex items-center gap-1.5"><Eye size={16} className="text-gray-400" /> {hienKeData.views.toLocaleString()} lượt xem</span>
                                </div>

                                <div className="prose max-w-none text-[15px] text-gray-700 whitespace-pre-line mb-8 leading-relaxed font-medium">
                                    <div dangerouslySetInnerHTML={{ __html: hienKeData.content.replace(/\*\*(.*?)\*\*/g, '<strong class="text-gray-900 font-bold">$1</strong>') }} />
                                </div>

                                {/* Attachments */}
                                {hienKeData.attachments.length > 0 && (
                                    <div className="mt-6 pt-6 border-t border-gray-100">
                                        <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2 text-[15px]">
                                            <BookOpen size={18} className="text-blue-600" /> Tài liệu đính kèm ({hienKeData.attachments.length})
                                        </h4>
                                        <ul className="flex flex-col gap-2">
                                            {hienKeData.attachments.map((file, idx) => (
                                                <li key={idx} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-200 hover:bg-white hover:shadow-sm transition group">
                                                    <div className="flex items-center gap-3">
                                                        <span className="bg-blue-100 text-blue-600 p-2 rounded-md">
                                                            <FileText size={18} />
                                                        </span>
                                                        <span className="font-semibold text-[14px] text-gray-700 group-hover:text-blue-700 transition">{file.name}</span>
                                                        <span className="text-[12px] text-gray-400">({file.size})</span>
                                                    </div>
                                                    <button className="text-gray-500 hover:text-blue-600 bg-gray-200 hover:bg-blue-50 p-1.5 rounded transition" title="Tải xuống">
                                                        <Download size={16} />
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Actions */}
                                <div className="flex flex-wrap items-center justify-end gap-3 mt-8 pt-6 border-t border-gray-100">
                                    <button onClick={() => setIsBookmarked(!isBookmarked)} className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold border transition text-[13px] ${isBookmarked ? 'bg-amber-50 text-amber-600 border-amber-200' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}>
                                        <Bookmark size={16} className={isBookmarked ? 'fill-amber-600' : ''} />
                                        {isBookmarked ? 'Đã lưu' : 'Lưu hiến kế'}
                                    </button>
                                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg font-bold border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 transition text-[13px]">
                                        <Share2 size={16} /> Chia sẻ
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Answer Box */}
                        {showAnswer ? (
                            <div className="bg-white rounded-xl shadow-sm border border-emerald-100 overflow-hidden relative">
                                {/* Expert header */}
                                <div className="bg-gradient-to-r from-emerald-50/50 to-white border-b border-emerald-50 p-6 flex items-start gap-4">
                                    <div className="w-14 h-14 bg-white border border-gray-150 shadow-sm rounded-full flex justify-center items-center overflow-hidden shrink-0">
                                        <User size={28} className="text-emerald-600/70" />
                                    </div>
                                    <div className="flex-grow">
                                        <div className="flex flex-wrap items-center gap-3">
                                            <h3 className="text-[18px] font-bold text-gray-900">{answerData.expertName}</h3>
                                            <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${answerData.expertType === 'Cơ quan nhà nước' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}>
                                                {answerData.expertType === 'Cơ quan nhà nước' ? <CheckCircle2 size={12} className="inline mr-1" /> : ''}
                                                {answerData.expertType}
                                            </span>
                                        </div>
                                        <p className="text-emerald-700 font-semibold mb-1 text-[13px]">{answerData.expertRole}</p>
                                        <p className="text-[12px] text-gray-500 flex items-center gap-1 font-medium"><Clock size={13} /> Phản hồi lúc: {answerData.date}</p>
                                    </div>
                                </div>

                                <div className="p-6 md:p-8">
                                    <div className="prose max-w-none text-gray-700 text-[15px] whitespace-pre-line leading-relaxed font-medium">
                                        <div dangerouslySetInnerHTML={{ __html: answerData.content.replace(/\*\*(.*?)\*\*/g, '<strong class="text-gray-900 font-bold">$1</strong>') }} />
                                    </div>

                                    {/* Law references */}
                                    {answerData.references && answerData.references.length > 0 && (
                                        <div className="mt-8 bg-amber-50/50 border border-amber-100 rounded-xl p-5">
                                            <h4 className="font-bold text-amber-800 flex items-center gap-2 mb-3 text-[14px]">
                                                <BookOpen size={16} /> Căn cứ đóng góp tham khảo
                                            </h4>
                                            <ul className="list-disc list-inside space-y-1 text-[13px] text-gray-600 font-medium">
                                                {answerData.references.map((ref, idx) => (
                                                    <li key={idx}><a href="#" className="hover:text-blue-700 hover:underline">{ref}</a></li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Feedback Section */}
                                    <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-50/50 -mx-6 md:-mx-8 -mb-6 md:-mb-8 p-6 md:p-8">
                                        <div className="text-gray-700 font-bold text-[14px]">
                                            Ý kiến phản hồi này có làm bạn hài lòng?
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleFeedback('like')}
                                                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold border transition shadow-sm text-[13px] ${hasLiked ? 'bg-emerald-500 text-white border-emerald-600' : 'bg-white text-emerald-600 border-emerald-200 hover:bg-emerald-50'}`}>
                                                <ThumbsUp size={16} /> Hài lòng ({answerData.likes + (hasLiked ? 1 : 0)})
                                            </button>
                                            <button
                                                onClick={() => handleFeedback('dislike')}
                                                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold border transition shadow-sm text-[13px] ${hasDisliked ? 'bg-gray-500 text-white border-gray-600' : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'}`}>
                                                <ThumbsDown size={16} /> Chưa hài lòng
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : isTrackingId ? (
                            <div className="bg-[#fffbeb] rounded-xl shadow-sm border border-amber-100 p-8 text-center flex flex-col items-center justify-center">
                                <Clock size={40} className="mx-auto text-amber-500 mb-4" />
                                <h3 className="text-[18px] font-bold text-amber-800 mb-2">Đang chờ cơ quan tiếp nhận</h3>
                                <p className="text-[14px] text-amber-700/80 max-w-md mx-auto">
                                    Hiến kế của bạn đã được chuyển đến cơ quan chủ quản thích hợp.
                                </p>
                            </div>
                        ) : (
                            <div className="bg-amber-50 rounded-xl shadow-sm border border-amber-100 p-8 text-center">
                                <Clock size={40} className="mx-auto text-amber-400 mb-4" />
                                <h3 className="text-[18px] font-bold text-amber-800 mb-2">Đang chờ cơ quan tiếp nhận</h3>
                                <p className="text-[14px] text-amber-700/80 mb-6 max-w-md mx-auto">
                                    Hiến kế của bạn đang được điều hướng đến cơ quan chủ quản thích hợp. Quá trình xét duyệt và phản hồi thường mất từ 5-10 ngày làm việc.
                                </p>
                                {!isBookmarked && (
                                    <button onClick={() => setIsBookmarked(true)} className="bg-white text-[14px] text-amber-600 font-bold py-2.5 px-6 rounded-xl border border-amber-200 hover:bg-amber-100 transition shadow-sm inline-flex items-center gap-2">
                                        <Bookmark size={16} /> Theo dõi hiến kế
                                    </button>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="lg:w-1/4 space-y-6">
                        {/* Related */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                            <h3 className="font-bold text-[14px] text-gray-900 border-b border-gray-150 pb-3 mb-4 flex items-center gap-2">
                                <Flame size={18} className="text-orange-500" /> Hiến kế tương tự
                            </h3>
                            <ul className="space-y-4">
                                {relatedIdeas.map((q) => (
                                    <li key={q.id}>
                                        <Link to={`/hien-ke/${q.id}`} className="group block">
                                            <h4 className="font-bold text-gray-700 text-[13px] leading-snug group-hover:text-blue-700 transition line-clamp-2">
                                                {q.title}
                                            </h4>
                                            <span className="text-[11px] text-emerald-600 mt-1.5 block font-semibold">Đã phản hồi</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Ask action */}
                        <div className="bg-gradient-to-br from-[#0f172a] to-[#1e3a8a] rounded-xl shadow-md p-6 text-white text-center">
                            <h3 className="font-bold text-[16px] mb-2">Bạn có ý tưởng cải tiến?</h3>
                            <p className="text-blue-100 text-[13px] mb-5 leading-relaxed">
                                Mỗi đóng góp của bạn đều giúp hoàn thiện hệ thống pháp luật và quản lý nhà nước hiệu quả hơn.
                            </p>
                            <Link to="/hien-ke/gop-y-nhanh" className="inline-block w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 px-6 rounded-lg transition shadow-sm text-[13px]">
                                <Send size={15} className="inline mr-1" /> Gửi hiến kế mới
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white font-sans">

            {/* ── HERO SECTION ─────────────────────────────────────────── */}
            <div className="relative pt-8 pb-10 overflow-hidden border-b border-[#1e3a8a]/20">
                {/* Background: trống đồng image */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat animate-bg-pan"
                    style={{ backgroundImage: "url('/images/dong_son_cover.png')" }}
                />
                {/* Overlay: dark navy so text is readable */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a]/90 via-[#1e3a8a]/80 to-[#1e3a8a]/60 z-0" />
                {/* Subtle gold shimmer overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0f172a]/50 z-0" />

                <div className="container mx-auto px-4 md:px-8 max-w-[1200px] relative z-20">
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-1.5 text-[13px] text-blue-300/80 mb-6 flex-wrap">
                        <Link to="/" className="hover:text-white transition-colors">Trang chủ</Link>
                        <ChevronRight size={14} />
                        <Link to="/hien-ke" className="hover:text-white transition-colors">Hiến kế xây dựng và thi hành pháp luật</Link>
                        <ChevronRight size={14} />
                        <Link to="/hien-ke/noi-bat-v2" className="hover:text-white transition-colors">Chúng tôi cần bạn</Link>
                        <ChevronRight size={14} />
                        <span className="text-white/90 font-medium line-clamp-1 max-w-[300px]">{data.title}</span>
                    </nav>

                    {/* Hero content */}
                    <div className="max-w-[800px]">
                        <h1 className="text-[28px] md:text-[38px] font-bold text-white leading-tight mb-5">
                            {data.title}
                        </h1>
                        <p className="text-[16px] text-blue-100/90 leading-relaxed mb-7 max-w-[680px]">
                            {data.summary}
                        </p>
                        <div className="flex flex-wrap items-center gap-3 mb-6">
                            <Link to={`/hien-ke/gop-y/${data.id}`} className="inline-flex items-center gap-2 px-6 py-3 bg-[#16a34a] text-white font-bold rounded-lg hover:bg-green-700 transition-all shadow-sm text-[15px]">
                                <Send size={16} /> Gửi ý kiến của bạn
                                <ExternalLink size={14} className="ml-1 opacity-70" />
                            </Link>
                            <Link to="/hien-ke" className="inline-flex items-center gap-2 px-5 py-3 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 border border-white/20 transition-all text-[14px]">
                                <ArrowLeft size={15} /> Quay lại danh sách
                            </Link>
                        </div>
                        <p className="text-[13px] text-blue-300/80">
                            Cập nhật lần cuối: {data.lastUpdated}
                        </p>
                    </div>
                </div>
            </div>

            {/* ── TWO-COLUMN BODY ──────────────────────────────────────── */}
            <div className="bg-[#f8f9fa] py-10">
                <div className="container mx-auto px-4 md:px-8 max-w-[1200px]">
                    <div className="flex flex-col lg:flex-row gap-8">

                        {/* ── LEFT: MAIN CONTENT (70%) ── */}
                        <div className="flex-1 min-w-0">

                            {/* Agency + Metadata card */}
                            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6 flex flex-col sm:flex-row gap-6 items-start">
                                {/* Agency logo placeholder */}
                                <div className="w-20 h-20 shrink-0 rounded-xl bg-[#1e3a8a] flex items-center justify-center shadow-sm">
                                    <span className="text-white font-black text-[16px] leading-tight text-center px-1">
                                        {data.agencyShort}
                                    </span>
                                </div>

                                <div className="flex-1 min-w-0">
                                    <h2 className="text-[17px] font-bold text-gray-900 mb-3">{data.agency}</h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[13px]">
                                        <div className="flex items-start gap-2">
                                            <Calendar size={14} className="text-gray-400 mt-0.5 shrink-0" />
                                            <div>
                                                <span className="font-semibold text-gray-600">Thời gian tham vấn: </span>
                                                <span className="text-gray-800">{data.startDate} – {data.endDate}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <CheckCircle2 size={14} className="text-gray-400 shrink-0" />
                                            <div className="flex items-center gap-2">
                                                <span className="font-semibold text-gray-600">Trạng thái: </span>
                                                <StatusBadge status={data.status} />
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Users size={14} className="text-gray-400 shrink-0" />
                                            <span className="text-gray-700">
                                                <span className="font-semibold text-gray-600">Lượt tham gia: </span>
                                                {data.participants.toLocaleString('vi-VN')}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Eye size={14} className="text-gray-400 shrink-0" />
                                            <span className="text-gray-700">
                                                <span className="font-semibold text-gray-600">Lượt xem: </span>
                                                {data.views.toLocaleString('vi-VN')}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Structured content */}
                            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:p-8 mb-6">
                                <h2 className="text-[20px] font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">
                                    Mô tả chi tiết
                                </h2>

                                <div className="space-y-8">
                                    {data.sections.map((sec, idx) => (
                                        <div key={sec.id} id={sec.id}>
                                            <h3 className="text-[17px] font-bold text-gray-900 mb-3">{sec.label}</h3>
                                            <div className="space-y-3">
                                                {sec.content.map((para, i) => (
                                                    <p key={i} className="text-[14px] text-gray-700 leading-relaxed">
                                                        {idx > 0 && sec.content.length > 1 ? (
                                                            <><span className="font-medium text-gray-500">{idx + 1}.</span> {para}</>
                                                        ) : para}
                                                    </p>
                                                ))}
                                                {sec.bullets && (
                                                    <ul className="space-y-2 mt-2 ml-4">
                                                        {sec.bullets.map((b, i) => (
                                                            <li key={i} className="flex items-start gap-3 text-[14px] text-gray-700">
                                                                <span className="mt-1.5 w-1.5 h-1.5 bg-[#1e3a8a] rounded-full shrink-0" />
                                                                {b}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Related events & forums */}
                            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
                                <h2 className="text-[18px] font-bold text-gray-900 mb-5 pb-3 border-b border-gray-100 flex items-center gap-2">
                                    <MessageSquare size={18} className="text-[#1e3a8a]" />
                                    Sự kiện liên quan
                                    <span className="ml-1 text-[13px] font-normal text-gray-400">({data.relatedEvents.length})</span>
                                </h2>
                                <div className="flex flex-col gap-3">
                                    {data.relatedEvents.map(ev => {
                                        const typeLabel = ev.type === 'stream' ? 'Livestream' : ev.type === 'event' ? 'Tọa đàm' : 'Diễn đàn';
                                        const typeBg = ev.type === 'stream' ? 'bg-red-100 text-red-700' : ev.type === 'event' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700';
                                        return (
                                            <Link key={ev.id} to={ev.to} className="group flex items-center gap-4 p-3 rounded-xl border border-gray-100 hover:border-[#1e3a8a] hover:bg-blue-50/20 transition-all">
                                                {/* Thumbnail */}
                                                <div className="shrink-0 w-28 h-20 rounded-lg overflow-hidden bg-gray-100 relative">
                                                    <img
                                                        src={ev.thumbnail}
                                                        alt={ev.title}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                    />
                                                    <span className={`absolute top-1.5 left-1.5 text-[10px] font-bold px-2 py-0.5 rounded-full ${typeBg}`}>
                                                        {typeLabel}
                                                    </span>
                                                </div>
                                                {/* Info */}
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-[14px] font-semibold text-gray-800 group-hover:text-[#1e3a8a] leading-snug line-clamp-2 mb-2 transition-colors">
                                                        {ev.title}
                                                    </p>
                                                    <p className="text-[12px] text-gray-500 flex items-center gap-1.5 font-medium">
                                                        <Calendar size={12} className="shrink-0" /> {ev.date}
                                                    </p>
                                                </div>
                                                <ChevronRight size={16} className="text-gray-300 group-hover:text-[#1e3a8a] shrink-0 transition-colors" />
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Attachments */}
                            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
                                <h2 className="text-[18px] font-bold text-gray-900 mb-5 pb-3 border-b border-gray-100 flex items-center gap-2">
                                    <Paperclip size={18} className="text-[#1e3a8a]" />
                                    Tài liệu đính kèm
                                    <span className="ml-1 text-[13px] font-normal text-gray-400">({data.attachments.length} tệp)</span>
                                </h2>
                                <div className="space-y-3">
                                    {data.attachments.map(att => (
                                        <div key={att.id} className="flex items-center justify-between gap-4 p-3.5 border border-gray-200 rounded-lg hover:border-[#1e3a8a] hover:bg-blue-50/30 transition-all group">
                                            <div className="flex items-center gap-3 min-w-0">
                                                {att.type === 'PDF' ? (
                                                    <div className="w-9 h-9 bg-red-50 rounded-lg flex items-center justify-center shrink-0 border border-red-100">
                                                        <File size={16} className="text-red-600" />
                                                    </div>
                                                ) : att.type === 'DOCX' ? (
                                                    <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center shrink-0 border border-blue-100">
                                                        <FileCode2 size={16} className="text-blue-600" />
                                                    </div>
                                                ) : (
                                                    <div className="w-9 h-9 bg-green-50 rounded-lg flex items-center justify-center shrink-0 border border-green-100">
                                                        <FileText size={16} className="text-green-600" />
                                                    </div>
                                                )}
                                                <div className="min-w-0">
                                                    <p className="text-[13px] font-semibold text-gray-800 truncate group-hover:text-[#1e3a8a] transition-colors">{att.name}</p>
                                                    <p className="text-[11px] text-gray-400 mt-0.5">{att.type} · {att.size}</p>
                                                </div>
                                            </div>
                                            <button className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-semibold text-[#1e3a8a] border border-[#1e3a8a] rounded-lg hover:bg-[#1e3a8a] hover:text-white transition-all shrink-0">
                                                <Download size={13} /> Tải xuống
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Comment / Feedback section */}

                        </div>

                        {/* ── RIGHT: SIDEBAR (30%) ── */}
                        <div className="lg:w-[300px] shrink-0 space-y-5">

                            {/* Back to listing */}
                            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                                <Link to="/hien-ke" className="flex items-center gap-2 text-[#1e3a8a] font-bold text-[14px] hover:underline mb-1">
                                    <ArrowLeft size={14} /> Quay lại danh sách
                                </Link>
                                <p className="text-[12px] text-gray-500 ml-6">Hiến kế xây dựng và thi hành pháp luật</p>
                            </div>

                            {/* Table of contents */}
                            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                                <h3 className="text-[13px] font-bold text-gray-700 uppercase tracking-wide mb-3">Nội dung trang</h3>
                                <nav className="space-y-1">
                                    {data.sections.map(sec => (
                                        <a
                                            key={sec.id}
                                            href={`#${sec.id}`}
                                            className="block text-[13px] text-[#1e3a8a] hover:underline py-1 border-l-2 border-transparent hover:border-[#1e3a8a] pl-3 transition-all"
                                        >
                                            {sec.label}
                                        </a>
                                    ))}
                                    <a href="#gop-y" className="block text-[13px] text-[#1e3a8a] hover:underline py-1 border-l-2 border-transparent hover:border-[#1e3a8a] pl-3 transition-all">
                                        Ý kiến đóng góp
                                    </a>
                                </nav>
                            </div>

                            {/* Quick metadata */}
                            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                                <h3 className="text-[13px] font-bold text-gray-700 uppercase tracking-wide mb-4">Thông tin thêm</h3>
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-[11px] text-gray-400 font-semibold uppercase mb-1">Trạng thái</p>
                                        <StatusBadge status={data.status} large />
                                    </div>
                                    <div>
                                        <p className="text-[11px] text-gray-400 font-semibold uppercase mb-1">Thời gian</p>
                                        <p className="text-[13px] font-semibold text-gray-800">{data.startDate} – {data.endDate}</p>
                                    </div>
                                    <div>
                                        <p className="text-[11px] text-gray-400 font-semibold uppercase mb-1">Cơ quan chủ trì</p>
                                        <p className="text-[13px] font-semibold text-gray-800">{data.agency}</p>
                                    </div>
                                    <div>
                                        <p className="text-[11px] text-gray-400 font-semibold uppercase mb-1">Lĩnh vực</p>
                                        <span className="inline-block text-[12px] font-semibold text-[#1e3a8a] bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-full">
                                            {data.domain}
                                        </span>
                                    </div>
                                </div>

                                {/* CTA */}
                                <div className="mt-5 pt-4 border-t border-gray-100">
                                    <Link to={`/hien-ke/gop-y/${data.id}`} className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#16a34a] text-white font-bold rounded-lg hover:bg-green-700 transition-all text-[14px]">
                                        <Send size={15} /> Gửi ý kiến
                                    </Link>
                                </div>
                            </div>

                            {/* Related consultations */}
                            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                                <h3 className="text-[13px] font-bold text-gray-700 uppercase tracking-wide mb-4">Chủ đề nổi bật khác</h3>
                                <div className="space-y-3">
                                    {data.relatedConsultations.map(r => (
                                        <Link
                                            key={r.id}
                                            to={`/hien-ke/${r.id}`}
                                            className="block group"
                                        >
                                            <div className="border border-gray-100 rounded-lg p-3 hover:border-[#1e3a8a] hover:bg-blue-50/30 transition-all">
                                                <p className="text-[13px] font-semibold text-[#1e3a8a] group-hover:underline leading-snug mb-2 line-clamp-2">
                                                    {r.title}
                                                </p>
                                                <div className="flex items-center justify-between gap-2">
                                                    <StatusBadge status={r.status} />
                                                    <span className="text-[11px] text-gray-400 flex items-center gap-1">
                                                        <Calendar size={10} /> {r.deadline}
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                                <Link to="/hien-ke" className="mt-4 block text-center text-[13px] font-semibold text-[#1e3a8a] hover:underline">
                                    Xem tất cả cuộc tham vấn →
                                </Link>
                            </div>


                            {/* Other pages in category */}
                            {/* <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                                <h3 className="text-[13px] font-bold text-gray-700 uppercase tracking-wide mb-1">Chủ đề nổi bật khác</h3>
                                <div className="space-y-2">
                                    {OTHER_PAGES.map(p => (
                                        <Link
                                            key={p.id}
                                            to={`/hien-ke/${p.id}`}
                                            className="block text-[13px] text-[#1e3a8a] hover:underline py-1.5 border-b border-gray-50 last:border-0 line-clamp-2 leading-snug"
                                        >
                                            {p.title}
                                        </Link>
                                    ))}
                                </div>
                                <Link to="/hien-ke" className="mt-3 block text-[13px] font-semibold text-[#1e3a8a] hover:underline">
                                    Xem tất cả chủ đề →
                                </Link>
                            </div> */}

                            {/* Back to top */}
                            <button
                                onClick={scrollToTop}
                                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-xl text-[13px] font-semibold text-gray-600 hover:text-[#1e3a8a] hover:border-[#1e3a8a] transition-all shadow-sm"
                            >
                                <ArrowUp size={14} /> Về đầu trang
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HienKeDetailPage;

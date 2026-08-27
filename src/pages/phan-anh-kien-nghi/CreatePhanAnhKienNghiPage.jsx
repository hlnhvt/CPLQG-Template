import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Send, CheckCircle, Copy, AlertCircle, Search, User } from 'lucide-react';

const CENTRAL_AGENCIES = [
    'Bộ Tư pháp',
    'Bộ Tài chính',
    'Bộ Công an',
    'Bộ Xây dựng',
    'Bộ Kế hoạch và Đầu tư',
    'Bộ Tài nguyên và Môi trường',
    'Bộ Y tế',
    'Bộ Giáo dục và Đào tạo',
    'Bộ Giao thông vận tải',
    'Bộ Nông nghiệp và Phát triển nông thôn',
    'Bộ Công Thương',
    'Bộ Lao động - Thương binh và Xã hội',
    'Bộ Khoa học và Công nghệ',
    'Bộ Văn hóa, Thể thao và Du lịch',
    'Bộ Thông tin và Truyền thông',
    'Bộ Nội vụ',
    'Bộ Ngoại giao',
    'Thanh tra Chính phủ',
    'Ngân hàng Nhà nước Việt Nam',
    'Ủy ban Dân tộc',
    'Văn phòng Chính phủ'
];

const PROVINCES = [
    'Thành phố Hà Nội',
    'Thành phố Hồ Chí Minh',
    'Thành phố Hải Phòng',
    'Thành phố Đà Nẵng',
    'Thành phố Cần Thơ',
    'Tỉnh An Giang',
    'Tỉnh Bà Rịa - Vũng Tàu',
    'Tỉnh Bắc Giang',
    'Tỉnh Bắc Kạn',
    'Tỉnh Bạc Liêu',
    'Tỉnh Bắc Ninh',
    'Tỉnh Bến Tre',
    'Tỉnh Bình Định',
    'Tỉnh Bình Dương',
    'Tỉnh Bình Phước',
    'Tỉnh Bình Thuận',
    'Tỉnh Cà Mau',
    'Tỉnh Cao Bằng',
    'Tỉnh Đắk Lắk',
    'Tỉnh Đắk Nông',
    'Tỉnh Điện Biên',
    'Tỉnh Đồng Nai',
    'Tỉnh Đồng Tháp',
    'Tỉnh Gia Lai',
    'Tỉnh Hà Giang',
    'Tỉnh Hà Nam',
    'Tỉnh Hà Tĩnh',
    'Tỉnh Hải Dương',
    'Tỉnh Hậu Giang',
    'Tỉnh Hòa Bình',
    'Tỉnh Hưng Yên',
    'Tỉnh Khánh Hòa',
    'Tỉnh Kiên Giang',
    'Tỉnh Kon Tum',
    'Tỉnh Lai Châu',
    'Tỉnh Lâm Đồng',
    'Tỉnh Lạng Sơn',
    'Tỉnh Lào Cai',
    'Tỉnh Long An',
    'Tỉnh Nam Định',
    'Tỉnh Nghệ An',
    'Tỉnh Ninh Bình',
    'Tỉnh Ninh Thuận',
    'Tỉnh Phú Thọ',
    'Tỉnh Phú Yên',
    'Tỉnh Quảng Bình',
    'Tỉnh Quảng Nam',
    'Tỉnh Quảng Ngãi',
    'Tỉnh Quảng Ninh',
    'Tỉnh Quảng Trị',
    'Tỉnh Sóc Trăng',
    'Tỉnh Sơn La',
    'Tỉnh Tây Ninh',
    'Tỉnh Thái Bình',
    'Tỉnh Thái Nguyên',
    'Tỉnh Thanh Hóa',
    'Tỉnh Thừa Thiên Huế',
    'Tỉnh Tiền Giang',
    'Tỉnh Trà Vinh',
    'Tỉnh Tuyên Quang',
    'Tỉnh Vĩnh Long',
    'Tỉnh Vĩnh Phúc',
    'Tỉnh Yên Bái'
];

const MOCK_LEGAL_DOCS_DATA = [
    {
        id: '120/2026/TT-BTC',
        name: 'Thông tư 120/2026/TT-BTC',
        soHieu: '120/2026/TT-BTC',
        tieuDe: '[Bộ Tài chính] Thông tư số 120/2026/TT-BTC Quy định nội dung, mức chi cho công tác xác minh, xác định, bảo vệ và hỗ trợ nạn nhân, người đang trong quá trình xác định là nạn nhân bị mua bán và người dưới 18 tuổi đi cùng quy định tại Nghị định số 162/2025/NĐ-CP ngày 29 tháng 6 năm 2025 của Chính phủ quy định chi tiết thi hành một số điều và biện pháp thi hành Luật Phòng, chống mua bán người',
        trichYeu: 'Thông tư số 120/2026/TT-BTC Quy định nội dung, mức chi cho công tác xác minh, xác định, bảo vệ và hỗ trợ nạn nhân, người đang trong quá trình xác định là nạn nhân bị mua bán và người dưới 18 tuổi đi cùng quy định tại Nghị định số 162/2025/NĐ-CP ngày 29 tháng 6 năm 2025 của Chính phủ quy định chi tiết thi hành một số điều và biện pháp thi hành Luật Phòng, chống mua bán người',
        ngayBanHanh: '17/8/2026',
        ngayHieuLuc: '1/10/2026',
        loaiVanBan: 'Thông tư',
        nganh: 'Tài chính',
        tinhTrangHieuLuc: 'Chưa có hiệu lực',
        coQuanBanHanh: 'Bộ Tài chính',
        nguoiKy: 'Nguyễn Thị Bích Ngọc',
        chucDanh: 'Thứ trưởng',
        files: [
            { name: 'Thông-tư-120-2026-TT-BTC.docx', url: '#' },
            { name: 'Thông-tư-120-2026-TT-BTC.pdf', url: '#' }
        ],
        mucLuc: [
            'Chương I: Những quy định chung',
            '— Điều 1: Phạm vi điều chỉnh',
            '— Điều 2: Đối tượng áp dụng',
            'Chương II: Nội dung và mức chi hỗ trợ nạn nhân',
            '— Điều 3: Chi hỗ trợ nhu cầu thiết yếu và chi phí đi lại',
            '— Điều 4: Chi hỗ trợ y tế và tâm lý',
            '— Điều 5: Chi hỗ trợ học văn hóa, học nghề',
            'Chương III: Tổ chức thực hiện',
            '— Điều 6: Nguồn kinh phí thực hiện',
            '— Điều 7: Hiệu lực thi hành'
        ],
        mucLucDetails: {
            'Chương I: Những quy định chung': `Chương I. NHỮNG QUY ĐỊNH CHUNG\nBao gồm các quy định về phạm vi điều chỉnh, đối tượng áp dụng, nguyên tắc quản lý và bố trí ngân sách cho công tác xác minh, xác định và hỗ trợ nạn nhân bị mua bán.`,
            '— Điều 1: Phạm vi điều chỉnh': `Điều 1. Phạm vi điều chỉnh\n1. Thông tư này quy định nội dung, mức chi cho công tác xác minh, xác định, bảo vệ và hỗ trợ nạn nhân, người đang trong quá trình xác định là nạn nhân bị mua bán và người dưới 18 tuổi đi cùng quy định tại Nghị định số 162/2025/NĐ-CP ngày 29 tháng 6 năm 2025 của Chính phủ quy định chi tiết thi hành một số điều và biện pháp thi hành Luật Phòng, chống mua bán người.\n2. Kinh phí thực hiện các chế độ hỗ trợ quy định tại Thông tư này do ngân sách nhà nước bảo đảm theo phân cấp ngân sách hiện hành.`,
            '— Điều 2: Đối tượng áp dụng': `Điều 2. Đối tượng áp dụng\n1. Nạn nhân bị mua bán là công dân Việt Nam, người không quốc tịch thường trú tại Việt Nam, người nước ngoài bị mua bán tại Việt Nam.\n2. Người đang trong quá trình xác định là nạn nhân theo quy định của pháp luật.\n3. Người dưới 18 tuổi đi cùng nạn nhân, người đang trong quá trình xác định là nạn nhân.\n4. Các cơ quan, tổ chức, cá nhân có liên quan đến việc thực hiện công tác bảo vệ và hỗ trợ nạn nhân.`,
            'Chương II: Nội dung và mức chi hỗ trợ nạn nhân': `Chương II. NỘI DUNG VÀ MỨC CHI HỖ TRỢ NẠN NHÂN\nQuy định cụ thể các định mức chi hỗ trợ nhu cầu thiết yếu, tiền ăn, quần áo, chi phí đi lại, y tế, tâm lý, pháp lý và học nghề cho nạn nhân bị mua bán.`,
            '— Điều 3: Chi hỗ trợ nhu cầu thiết yếu và chi phí đi lại': `Điều 3. Chi hỗ trợ nhu cầu thiết yếu và chi phí đi lại\n1. Chi tiền ăn trong thời gian lưu trú tại cơ sở trợ giúp xã hội hoặc cơ sở hỗ trợ nạn nhân: Mức chi 70.000 đồng/người/ngày, thời gian hỗ trợ tối đa không quá 60 ngày.\n2. Chi hỗ trợ quần áo, đồ dùng sinh hoạt cá nhân thiết yếu: Mức chi tối đa 400.000 đồng/người.\n3. Chi tiền tàu xe hoặc phương tiện công cộng đưa nạn nhân về nơi cư trú: Theo giá vé giao thông công cộng thực tế.`,
            '— Điều 4: Chi hỗ trợ y tế và tâm lý': `Điều 4. Chi hỗ trợ y tế và tâm lý\n1. Chi khám, chữa bệnh: Được chi trả theo quy định của pháp luật về bảo hiểm y tế. Trường hợp nạn nhân không có thẻ BHYT thì được hỗ trợ chi phí khám chữa bệnh tương đương mức thanh toán của quỹ BHYT.\n2. Chi hỗ trợ tư vấn tâm lý: Mức chi 50.000 đồng/người/buổi tư vấn, tối đa không quá 10 buổi.`,
            '— Điều 5: Chi hỗ trợ học văn hóa, học nghề': `Điều 5. Chi hỗ trợ học văn hóa, học nghề\n1. Hỗ trợ học phí học văn hóa theo mức thu học phí thực tế của cơ sở giáo dục công lập tại địa phương nơi nạn nhân theo học.\n2. Hỗ trợ học nghề trình độ sơ cấp hoặc đào tạo nghề dưới 3 tháng: Mức hỗ trợ tối đa 3.000.000 đồng/người/khóa học.`,
            'Chương III: Tổ chức thực hiện': `Chương III. TỔ CHỨC THỰC HIỆN\nQuy định về nguồn kinh phí, lập dự toán, chấp hành và quyết toán kinh phí của các bộ, ngành, địa phương.`,
            '— Điều 6: Nguồn kinh phí thực hiện': `Điều 6. Nguồn kinh phí thực hiện\n1. Nguồn ngân sách nhà nước bố trí trong dự toán chi thường xuyên của các bộ, cơ quan trung ương và địa phương theo quy định của Luật Ngân sách nhà nước.\n2. Nguồn tài trợ, viện trợ, đóng góp hợp pháp của các tổ chức, cá nhân trong và ngoài nước.`,
            '— Điều 7: Hiệu lực thi hành': `Điều 7. Hiệu lực thi hành\n1. Thông tư này có hiệu lực thi hành kể từ ngày 01 tháng 10 năm 2026.\n2. Trường hợp các văn bản dẫn chiếu tại Thông tư này được sửa đổi, bổ sung hoặc thay thế thì áp dụng theo văn bản sửa đổi, bổ sung hoặc thay thế đó.`
        }
    },
    {
        id: '31/2024/QH15',
        name: 'Luật Đất đai 2024',
        soHieu: '31/2024/QH15',
        tieuDe: 'Luật Đất đai số 31/2024/QH15 ngày 18 tháng 01 năm 2024 của Quốc hội',
        trichYeu: 'Quy định về chế độ sở hữu đất đai, quyền hạn và trách nhiệm của Nhà nước đại diện chủ sở hữu toàn dân về đất đai và thống nhất quản lý về đất đai, chế độ quản lý và sử dụng đất đai, quyền và nghĩa vụ của người sử dụng đất đối với đất đai thuộc lãnh thổ nước Cộng hòa xã hội chủ nghĩa Việt Nam.',
        ngayBanHanh: '18/01/2024',
        ngayHieuLuc: '01/08/2024',
        loaiVanBan: 'Luật',
        nganh: 'Đất đai - Tài nguyên Môi trường',
        tinhTrangHieuLuc: 'Còn hiệu lực',
        coQuanBanHanh: 'Quốc hội',
        nguoiKy: 'Vương Đình Huệ',
        chucDanh: 'Chủ tịch Quốc hội',
        files: [
            { name: 'Luat-Dat-dai-2024-31-2024-QH15.docx', url: '#' },
            { name: 'Luat-Dat-dai-2024-31-2024-QH15.pdf', url: '#' }
        ],
        mucLuc: [
            'Chương I: Quy định chung',
            '— Điều 1: Phạm vi điều chỉnh',
            '— Điều 2: Đối tượng áp dụng',
            '— Điều 3: Giải thích từ ngữ',
            '— Điều 4: Người sử dụng đất',
            'Chương II: Quyền và trách nhiệm của Nhà nước, quyền và nghĩa vụ của công dân đối với đất đai',
            '— Điều 11: Quyền của Nhà nước đối với đất đai',
            '— Điều 12: Trách nhiệm của Nhà nước đối với đất đai',
            'Chương III: Địa giới hành chính, điều tra cơ bản về đất đai',
            '— Điều 25: Địa giới đơn vị hành chính',
            'Chương IV: Quy hoạch, kế hoạch sử dụng đất',
            '— Điều 60: Nguyên tắc lập quy hoạch sử dụng đất'
        ],
        mucLucDetails: {
            'Chương I: Quy định chung': `Chương I. QUY ĐỊNH CHUNG\nQuy định các nguyên tắc cơ bản về chế độ sở hữu đất đai, phạm vi điều chỉnh, người sử dụng đất và các hành vi bị nghiêm cấm trong quản lý, sử dụng đất đai.`,
            '— Điều 1: Phạm vi điều chỉnh': `Điều 1. Phạm vi điều chỉnh\nLuật này quy định về chế độ sở hữu đất đai, quyền hạn và trách nhiệm của Nhà nước đại diện chủ sở hữu toàn dân về đất đai và thống nhất quản lý về đất đai, chế độ quản lý và sử dụng đất đai, quyền và nghĩa vụ của công dân, người sử dụng đất đối với đất đai thuộc lãnh thổ của nước Cộng hòa xã hội chủ nghĩa Việt Nam.`,
            '— Điều 2: Đối tượng áp dụng': `Điều 2. Đối tượng áp dụng\n1. Cơ quan nhà nước thực hiện quyền hạn và trách nhiệm đại diện chủ sở hữu toàn dân về đất đai, thực hiện nhiệm vụ thống nhất quản lý nhà nước về đất đai.\n2. Người sử dụng đất quy định tại Điều 4 của Luật này.\n3. Các đối tượng khác có liên quan đến việc quản lý, sử dụng đất đai.`,
            '— Điều 3: Giải thích từ ngữ': `Điều 3. Giải thích từ ngữ\nGiải thích các thuật ngữ chuyên ngành: Bồi thường về đất, Bảng giá đất, Cấp giấy chứng nhận quyền sử dụng đất, Chuyển mục đích sử dụng đất, Đất nông nghiệp, Đất phi nông nghiệp, Thu hồi đất...`,
            '— Điều 4: Người sử dụng đất': `Điều 4. Người sử dụng đất\nNgười sử dụng đất được Nhà nước giao đất, cho thuê đất, công nhận quyền sử dụng đất; đang sử dụng đất ổn định, đủ điều kiện cấp Giấy chứng nhận quyền sử dụng đất, quyền sở hữu tài sản gắn liền với đất.`,
            'Chương II: Quyền và trách nhiệm của Nhà nước, quyền và nghĩa vụ của công dân đối với đất đai': `Chương II. QUYỀN VÀ TRÁCH NHIỆM CỦA NHÀ NƯỚC, QUYỀN VÀ NGHĨA VỤ CỦA CÔNG DÂN ĐỐI VỚI ĐẤT ĐAI\nQuy định quyền đại diện chủ sở hữu toàn dân của Nhà nước, chính sách bảo đảm của Nhà nước cho người sử dụng đất và quyền tiếp cận thông tin đất đai của công dân.`,
            '— Điều 11: Quyền của Nhà nước đối với đất đai': `Điều 11. Quyền của Nhà nước đối với đất đai\n1. Quyết định quy hoạch, kế hoạch sử dụng đất.\n2. Quyết định mục đích sử dụng đất.\n3. Quy định hạn mức sử dụng đất, thời hạn sử dụng đất.\n4. Quyết định thu hồi đất, trưng dụng đất.\n5. Quyết định giá đất.\n6. Trao quyền sử dụng đất cho người sử dụng đất.`,
            '— Điều 12: Trách nhiệm của Nhà nước đối với đất đai': `Điều 12. Trách nhiệm của Nhà nước đối với người sử dụng đất\n1. Có chính sách tạo điều kiện cho người trực tiếp sản xuất nông nghiệp có đất để sản xuất.\n2. Bảo hộ quyền sử dụng đất hợp pháp của người sử dụng đất.\n3. Có chính sách bồi thường, hỗ trợ, tái định cư thỏa đáng khi Nhà nước thu hồi đất.`
        }
    },
    {
        id: '27/2023/QH15',
        name: 'Luật Nhà ở 2023',
        soHieu: '27/2023/QH15',
        tieuDe: 'Luật Nhà ở số 27/2023/QH15 ngày 27 tháng 11 năm 2023 của Quốc hội',
        trichYeu: 'Quy định về sở hữu, phát triển, quản lý vận hành, giao dịch nhà ở; quản lý nhà nước về nhà ở tại Việt Nam.',
        ngayBanHanh: '27/11/2023',
        ngayHieuLuc: '01/08/2024',
        loaiVanBan: 'Luật',
        nganh: 'Xây dựng - Nhà ở',
        tinhTrangHieuLuc: 'Còn hiệu lực',
        coQuanBanHanh: 'Quốc hội',
        nguoiKy: 'Vương Đình Huệ',
        chucDanh: 'Chủ tịch Quốc hội',
        files: [
            { name: 'Luat-Nha-o-2023-27-2023-QH15.docx', url: '#' },
            { name: 'Luat-Nha-o-2023-27-2023-QH15.pdf', url: '#' }
        ],
        mucLuc: [
            'Chương I: Quy định chung',
            '— Điều 1: Phạm vi điều chỉnh',
            '— Điều 2: Đối tượng áp dụng',
            'Chương II: Sở hữu nhà ở',
            '— Điều 7: Đối tượng được sở hữu nhà ở tại Việt Nam',
            'Chương III: Chiến lược phát triển nhà ở quốc gia, chương trình, kế hoạch phát triển nhà ở cấp tỉnh',
            'Chương VI: Chính sách về nhà ở xã hội'
        ],
        mucLucDetails: {
            'Chương I: Quy định chung': `Chương I. QUY ĐỊNH CHUNG\nQuy định phạm vi điều chỉnh, đối tượng áp dụng, chính sách phát triển và quản lý nhà ở của Nhà nước.`,
            '— Điều 1: Phạm vi điều chỉnh': `Điều 1. Phạm vi điều chỉnh\nLuật này quy định về sở hữu, phát triển, quản lý vận hành, sử dụng nhà ở, giao dịch về nhà ở và quản lý nhà nước về nhà ở tại Việt Nam.`,
            '— Điều 2: Đối tượng áp dụng': `Điều 2. Đối tượng áp dụng\nLuật này áp dụng đối với cơ quan, tổ chức, cá nhân trong nước, người Việt Nam định cư ở nước ngoài, tổ chức, cá nhân nước ngoài có liên quan đến sở hữu, phát triển, quản lý vận hành, giao dịch và quản lý nhà nước về nhà ở.`,
            'Chương II: Sở hữu nhà ở': `Chương II. SỞ HỮU NHÀ Ở\nQuy định điều kiện, đối tượng và thời hạn sở hữu nhà ở đối với tổ chức, cá nhân trong và ngoài nước.`,
            '— Điều 7: Đối tượng được sở hữu nhà ở tại Việt Nam': `Điều 7. Đối tượng được sở hữu nhà ở tại Việt Nam\n1. Tổ chức, cá nhân trong nước.\n2. Người Việt Nam định cư ở nước ngoài theo quy định của pháp luật về quốc tịch.\n3. Tổ chức, cá nhân nước ngoài theo quy định tại khoản 1 Điều 17 của Luật này.`,
            'Chương VI: Chính sách về nhà ở xã hội': `Chương VI. CHÍNH SÁCH VỀ NHÀ Ở XÃ HỘI\nQuy định điều kiện thụ hưởng chính sách nhà ở xã hội, hình thức hỗ trợ, nguyên tắc xác định giá bán, cho thuê mua nhà ở xã hội.`
        }
    },
    {
        id: '102/2024/NĐ-CP',
        name: 'Nghị định 102/2024/NĐ-CP',
        soHieu: '102/2024/NĐ-CP',
        tieuDe: 'Nghị định số 102/2024/NĐ-CP ngày 30 tháng 07 năm 2024 của Chính phủ Quy định chi tiết thi hành một số điều của Luật Đất đai',
        trichYeu: 'Quy định chi tiết thi hành một số điều, khoản của Luật Đất đai số 31/2024/QH15 về quy hoạch, kế hoạch sử dụng đất, thu hồi đất, giao đất, cho thuê đất, chuyển mục đích sử dụng đất.',
        ngayBanHanh: '30/07/2024',
        ngayHieuLuc: '01/08/2024',
        loaiVanBan: 'Nghị định',
        nganh: 'Tài nguyên và Môi trường',
        tinhTrangHieuLuc: 'Còn hiệu lực',
        coQuanBanHanh: 'Chính phủ',
        nguoiKy: 'Phạm Minh Chính',
        chucDanh: 'Thủ tướng Chính phủ',
        files: [
            { name: 'Nghi-dinh-102-2024-ND-CP.docx', url: '#' },
            { name: 'Nghi-dinh-102-2024-ND-CP.pdf', url: '#' }
        ],
        mucLuc: [
            'Chương I: Quy định chung',
            '— Điều 1: Phạm vi điều chỉnh',
            'Chương II: Chức năng, nhiệm vụ, cơ cấu tổ chức của các cơ quan quản lý đất đai',
            'Chương III: Thu hồi đất, trưng dụng đất'
        ],
        mucLucDetails: {
            'Chương I: Quy định chung': `Chương I. QUY ĐỊNH CHUNG\nQuy định chi tiết thi hành các điều khoản được giao trong Luật Đất đai 2024 về trình tự, thủ tục hành chính đất đai.`,
            '— Điều 1: Phạm vi điều chỉnh': `Điều 1. Phạm vi điều chỉnh\nNghị định này quy định chi tiết thi hành một số điều, khoản của Luật Đất đai số 31/2024/QH15.`,
            'Chương II: Chức năng, nhiệm vụ, cơ cấu tổ chức của các cơ quan quản lý đất đai': `Chương II: Quy định hệ thống cơ quan quản lý đất đai từ trung ương đến địa phương và tổ chức dịch vụ công về đất đai.`,
            'Chương III: Thu hồi đất, trưng dụng đất': `Chương III: Quy định trình tự, thủ tục thu hồi đất vì mục đích quốc phòng, an ninh; phát triển kinh tế - xã hội vì lợi ích quốc gia, công cộng.`
        }
    },
    {
        id: '04/2025/TT-BTC',
        name: 'Thông tư 04/2025/TT-BTC',
        soHieu: '04/2025/TT-BTC',
        tieuDe: 'Thông tư số 04/2025/TT-BTC ngày 15 tháng 01 năm 2025 của Bộ Tài chính hướng dẫn quản lý thu ngân sách nhà nước',
        trichYeu: 'Hướng dẫn quy trình, thủ tục đối soát, tổng hợp và phân bổ nguồn thu ngân sách nhà nước qua hệ thống Kho bạc Nhà nước.',
        ngayBanHanh: '15/01/2025',
        ngayHieuLuc: '01/03/2025',
        loaiVanBan: 'Thông tư',
        nganh: 'Tài chính',
        tinhTrangHieuLuc: 'Còn hiệu lực',
        coQuanBanHanh: 'Bộ Tài chính',
        nguoiKy: 'Hồ Đức Phớc',
        chucDanh: 'Bộ trưởng',
        files: [
            { name: 'Thong-tu-04-2025-TT-BTC.docx', url: '#' },
            { name: 'Thong-tu-04-2025-TT-BTC.pdf', url: '#' }
        ],
        mucLuc: [
            'Chương I: Quy định chung',
            '— Điều 1: Phạm vi và đối tượng áp dụng',
            'Chương II: Quy trình thu nộp ngân sách',
            '— Điều 2: Hạch toán các khoản thu ngân sách'
        ],
        mucLucDetails: {
            'Chương I: Quy định chung': `Chương I. QUY ĐỊNH CHUNG\nHướng dẫn nguyên tắc hạch toán và điều tiết các khoản thu vào ngân sách nhà nước.`,
            '— Điều 1: Phạm vi và đối tượng áp dụng': `Điều 1. Phạm vi và đối tượng áp dụng\nThông tư này áp dụng đối với cơ quan thu, Kho bạc Nhà nước, ngân hàng thương mại phối hợp thu và các tổ chức, cá nhân có nghĩa vụ nộp ngân sách nhà nước.`,
            'Chương II: Quy trình thu nộp ngân sách': `Chương II: Quy định chi tiết luồng dữ liệu điện tử và đối soát thông tin nộp ngân sách.`,
            '— Điều 2: Hạch toán các khoản thu ngân sách': `Điều 2. Hạch toán các khoản thu ngân sách\nQuy định việc phân chia nguồn thu giữa ngân sách trung ương và ngân sách địa phương theo đúng mục lục ngân sách.`
        }
    },
    {
        id: '41/2024/QH15',
        name: 'Luật Bảo hiểm xã hội 2024',
        soHieu: '41/2024/QH15',
        tieuDe: 'Luật Bảo hiểm xã hội số 41/2024/QH15 ngày 29 tháng 06 năm 2024 của Quốc hội',
        trichYeu: 'Quy định quyền, trách nhiệm của cơ quan, tổ chức, cá nhân về bảo hiểm xã hội; trợ cấp hưu trí xã hội; chế độ bảo hiểm xã hội bắt buộc, bảo hiểm xã hội tự nguyện; quỹ bảo hiểm xã hội.',
        ngayBanHanh: '29/06/2024',
        ngayHieuLuc: '01/07/2025',
        loaiVanBan: 'Luật',
        nganh: 'Lao động - Xã hội',
        tinhTrangHieuLuc: 'Chưa có hiệu lực',
        coQuanBanHanh: 'Quốc hội',
        nguoiKy: 'Trần Thanh Mẫn',
        chucDanh: 'Chủ tịch Quốc hội',
        files: [
            { name: 'Luat-BHXH-2024-41-2024-QH15.docx', url: '#' },
            { name: 'Luat-BHXH-2024-41-2024-QH15.pdf', url: '#' }
        ],
        mucLuc: [
            'Chương I: Những quy định chung',
            '— Điều 1: Phạm vi điều chỉnh',
            '— Điều 2: Đối tượng áp dụng',
            'Chương II: Chế độ ốm đau, thai sản',
            'Chương III: Chế độ hưu trí, tử tuất'
        ],
        mucLucDetails: {
            'Chương I: Những quy định chung': `Chương I. NHỮNG QUY ĐỊNH CHUNG\nQuy định phạm vi điều chỉnh, đối tượng tham gia bảo hiểm xã hội bắt buộc và tự nguyện.`,
            '— Điều 1: Phạm vi điều chỉnh': `Điều 1. Phạm vi điều chỉnh\nLuật này quy định quyền, trách nhiệm của cơ quan, tổ chức, cá nhân về bảo hiểm xã hội; trợ cấp hưu trí xã hội; các chế độ bảo hiểm xã hội; quỹ bảo hiểm xã hội.`,
            '— Điều 2: Đối tượng áp dụng': `Điều 2. Đối tượng tham gia bảo hiểm xã hội\nQuy định các nhóm người lao động thuộc diện tham gia bảo hiểm xã hội bắt buộc và tự nguyện.`,
            'Chương II: Chế độ ốm đau, thai sản': `Chương II. CHẾ ĐỘ ỐM ĐAU, THAI SẢN\nQuy định điều kiện, thời gian và mức hưởng trợ cấp ốm đau, thai sản cho người lao động.`,
            'Chương III: Chế độ hưu trí, tử tuất': `Chương III. CHẾ ĐỘ HƯU TRÍ, TỬ TUẤT\nQuy định điều kiện hưởng lương hưu, mức lương hưu hàng tháng và chế độ trợ cấp mai táng, tuất hàng tháng.`
        }
    },
    {
        id: '23/2008/QH12',
        name: 'Luật Giao thông đường bộ 2008',
        soHieu: '23/2008/QH12',
        tieuDe: 'Luật Giao thông đường bộ số 23/2008/QH12 ngày 13 tháng 11 năm 2008 của Quốc hội',
        trichYeu: 'Quy định về quy tắc giao thông đường bộ; kết cấu hạ tầng giao thông đường bộ; phương tiện tham gia giao thông đường bộ; người điều khiển phương tiện tham gia giao thông đường bộ; vận tải đường bộ và quản lý nhà nước về giao thông đường bộ.',
        ngayBanHanh: '13/11/2008',
        ngayHieuLuc: '01/07/2009',
        loaiVanBan: 'Luật',
        nganh: 'Giao thông vận tải',
        tinhTrangHieuLuc: 'Còn hiệu lực',
        coQuanBanHanh: 'Quốc hội',
        nguoiKy: 'Nguyễn Phú Trọng',
        chucDanh: 'Chủ tịch Quốc hội',
        files: [
            { name: 'Luat-GTDB-2008-23-2008-QH12.docx', url: '#' },
            { name: 'Luat-GTDB-2008-23-2008-QH12.pdf', url: '#' }
        ],
        mucLuc: [
            'Chương I: Quy định chung',
            '— Điều 1: Phạm vi điều chỉnh',
            '— Điều 8: Các hành vi bị nghiêm cấm',
            'Chương II: Quy tắc giao thông đường bộ'
        ],
        mucLucDetails: {
            'Chương I: Quy định chung': `Chương I. QUY ĐỊNH CHUNG\nQuy định nguyên tắc hoạt động giao thông đường bộ, chính sách phát triển giao thông và tuyên truyền phổ biến pháp luật giao thông.`,
            '— Điều 1: Phạm vi điều chỉnh': `Điều 1. Phạm vi điều chỉnh\nLuật này quy định về quy tắc giao thông đường bộ; kết cấu hạ tầng giao thông đường bộ; phương tiện và người tham gia giao thông đường bộ; vận tải đường bộ và quản lý nhà nước về giao thông đường bộ.`,
            '— Điều 8: Các hành vi bị nghiêm cấm': `Điều 8. Các hành vi bị nghiêm cấm\n1. Phá hoại công trình đường bộ.\n2. Điều khiển phương tiện giao thông đường bộ mà trong cơ thể có chất ma túy.\n3. Điều khiển phương tiện giao thông đường bộ mà trong máu hoặc hơi thở có nồng độ cồn.`,
            'Chương II: Quy tắc giao thông đường bộ': `Chương II. QUY TẮC GIAO THÔNG ĐƯỜNG BỘ\nQuy định hệ thống báo hiệu đường bộ, tốc độ và khoảng cách giữa các xe, chuyển hướng xe và nhường đường tại nơi đường giao nhau.`
        }
    }
];

const CreatePhanAnhKienNghiPage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const initialVanBan = searchParams.get('vanban') || '';

    // Redirect if not logged in
    useEffect(() => {
        if (!user) {
            navigate('/dang-nhap', { state: { from: '/phan-anh-kien-nghi/tao-moi' } });
        }
    }, [user, navigate]);

    const [files, setFiles] = useState([]);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [trackingCode, setTrackingCode] = useState('');
    const [selectedDoc, setSelectedDoc] = useState(null);
    const [formData, setFormData] = useState({
        level: 'Trung ương',
        agency: '',
        province: '',
        content: '',
        legalDocs: initialVanBan,
        tableOfContent: '',
        termsAgreed: false
    });
    const [errors, setErrors] = useState({});
    const [docSearchQuery, setDocSearchQuery] = useState(initialVanBan);
    const [showDocDropdown, setShowDocDropdown] = useState(false);

    useEffect(() => {
        if (initialVanBan) {
            const matched = MOCK_LEGAL_DOCS_DATA.find(d =>
                initialVanBan.toLowerCase().includes(d.soHieu.toLowerCase()) ||
                initialVanBan.toLowerCase().includes(d.name.toLowerCase()) ||
                d.tieuDe.toLowerCase().includes(initialVanBan.toLowerCase())
            );
            if (matched) {
                setSelectedDoc(matched);
                setDocSearchQuery(matched.name);
                setFormData(prev => ({ ...prev, legalDocs: matched.tieuDe }));
            }
        }
    }, [initialVanBan]);

    if (!user) return null;

    const filteredDocs = MOCK_LEGAL_DOCS_DATA.filter(doc =>
        doc.name.toLowerCase().includes(docSearchQuery.toLowerCase()) ||
        doc.soHieu.toLowerCase().includes(docSearchQuery.toLowerCase()) ||
        doc.tieuDe.toLowerCase().includes(docSearchQuery.toLowerCase())
    );

    const handleLevelChange = (newLevel) => {
        if (newLevel === formData.level) return;
        setFormData(prev => ({
            ...prev,
            level: newLevel,
            agency: '',
            province: '',
            content: '',
            legalDocs: '',
            tableOfContent: '',
            termsAgreed: false
        }));
        setDocSearchQuery('');
        setSelectedDoc(null);
        setShowDocDropdown(false);
        setFiles([]);
        setErrors({});
    };

    const handleSelectDoc = (doc) => {
        setSelectedDoc(doc);
        setFormData(prev => ({
            ...prev,
            legalDocs: doc.tieuDe || doc.name,
            tableOfContent: '',
            content: ''
        }));
        setDocSearchQuery(doc.name || doc.soHieu);
        setShowDocDropdown(false);
        setErrors(prev => ({ ...prev, legalDocs: null }));
    };

    const handleTableOfContentChange = (selectedItem) => {
        const contentToFill = selectedItem ? selectedItem.replace(/^[—–-]\s*/, '') : '';

        setFormData(prev => ({
            ...prev,
            tableOfContent: selectedItem,
            content: contentToFill
        }));
        if (errors.content) {
            setErrors(prev => ({ ...prev, content: null }));
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            // Validation logic
            const validFiles = newFiles.filter(file => {
                const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB
                const isValidType = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png'].includes(file.type);
                return isValidSize && isValidType;
            });

            if (validFiles.length !== newFiles.length) {
                alert('Một số file không hợp lệ (Vượt 10MB hoặc sai định dạng).');
            }

            if (files.length + validFiles.length > 3) {
                alert('Tối đa 3 file đính kèm.');
                return;
            }

            setFiles([...files, ...validFiles]);
        }
    };

    const removeFile = (index) => {
        setFiles(files.filter((_, i) => i !== index));
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.legalDocs) newErrors.legalDocs = 'Vui lòng chọn hoặc nhập văn bản pháp luật liên quan';
        if (formData.level === 'Trung ương') {
            if (!formData.agency) newErrors.agency = 'Vui lòng chọn cơ quan tiếp nhận';
        } else {
            if (!formData.province) newErrors.province = 'Vui lòng chọn địa phương';
        }
        if (!formData.content) newErrors.content = 'Vui lòng nhập nội dung chi tiết';
        if (!formData.termsAgreed) newErrors.termsAgreed = 'Bạn phải đồng ý với cam kết';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            // Mock API call
            setTimeout(() => {
                setTrackingCode(`PA${Date.now()}`);
                setIsSubmitted(true);
            }, 600);
        }
    };

    const handleCopyCode = () => {
        navigator.clipboard.writeText(trackingCode);
        alert('Đã sao chép mã theo dõi!');
    };

    const handleCancel = () => {
        if (formData.content || formData.legalDocs) {
            if (window.confirm('Bạn có chắc chắn muốn hủy? Thông tin đã nhập sẽ bị mất.')) {
                navigate('/phan-anh-kien-nghi');
            }
        } else {
            navigate('/phan-anh-kien-nghi');
        }
    };

    // View for success
    if (isSubmitted) {
        return (
            <div className="bg-[#f4f7fb] min-h-screen py-16 flex items-center justify-center">
                <div className="bg-white p-10 rounded-2xl shadow-lg max-w-lg w-full text-center mx-4">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                        <CheckCircle size={48} />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Gửi phản ánh thành công!</h1>
                    <p className="text-gray-600 mb-8">Lưu mã này để tra cứu kết quả xử lý. Bạn cũng sẽ nhận thông báo qua email khi có kết quả.</p>

                    <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 mb-8">
                        <p className="text-sm font-medium text-blue-800 mb-2 uppercase tracking-wide">Mã theo dõi của bạn</p>
                        <div className="text-3xl font-black text-[#0f4c81] tracking-widest bg-white py-3 rounded-lg border border-blue-200 shadow-sm flex items-center justify-center gap-3">
                            {trackingCode}
                            <button onClick={handleCopyCode} className="text-blue-500 hover:text-blue-700 bg-blue-50 p-2 rounded-md transition" title="Sao chép">
                                <Copy size={20} />
                            </button>
                        </div>
                    </div>

                    <div className="text-left bg-gray-50 p-5 rounded-lg border text-sm mb-8 space-y-2">
                        <div className="flex gap-2">
                            <span className="text-gray-500 w-36">Cấp xử lý:</span>
                            <span className="font-medium">{formData.level}</span>
                        </div>
                        {formData.level === 'Trung ương' ? (
                            <div className="flex gap-2">
                                <span className="text-gray-500 w-36">Cơ quan tiếp nhận:</span>
                                <span className="font-medium">{formData.agency}</span>
                            </div>
                        ) : (
                            <div className="flex gap-2">
                                <span className="text-gray-500 w-36">Địa phương:</span>
                                <span className="font-medium">{formData.province}</span>
                            </div>
                        )}
                        <div className="flex gap-2">
                            <span className="text-gray-500 w-36">Văn bản liên quan:</span>
                            <span className="font-medium line-clamp-1">{formData.legalDocs}</span>
                        </div>
                        {formData.tableOfContent && (
                            <div className="flex gap-2">
                                <span className="text-gray-500 w-36">Mục lục:</span>
                                <span className="font-medium">{formData.tableOfContent}</span>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col gap-3">
                        <Link to={`/phan-anh-kien-nghi?tab=search&code=${trackingCode}`} className="w-full bg-[#0f4c81] text-white py-3 rounded-xl font-bold hover:bg-blue-800 transition shadow-md">
                            Tra cứu phản ánh
                        </Link>
                        <div className="flex gap-3">
                            <button onClick={() => { setIsSubmitted(false); setFormData({ ...formData, content: '', legalDocs: '', tableOfContent: '', agency: '', province: '' }); setSelectedDoc(null); }} className="flex-1 bg-white border-2 border-gray-200 text-gray-700 py-2.5 rounded-xl font-medium hover:bg-gray-50 transition">
                                Gửi mới
                            </button>
                            <Link to="/" className="flex-1 bg-white border-2 border-gray-200 text-gray-700 py-2.5 rounded-xl font-medium hover:bg-gray-50 transition block">
                                Về trang chủ
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Form View
    return (
        <div className="bg-[#f4f7fb] min-h-screen pb-16">
            <div className="bg-white border-b">
                <div className="container mx-auto px-4 py-3">
                    <div className="flex items-center text-sm text-gray-500">
                        <Link to="/" className="hover:text-[#0f4c81]">Trang chủ</Link>
                        <span className="mx-2">/</span>
                        <Link to="/phan-anh-kien-nghi" className="hover:text-[#0f4c81]">Phản ánh kiến nghị</Link>
                        <span className="mx-2">/</span>
                        <span className="text-gray-900 font-medium">Gửi phản ánh</span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 mt-8 max-w-4xl">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    {/* Header */}
                    <div className="bg-[#1a3b8b] text-white p-6 sm:p-8">
                        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Gửi phản ánh, kiến nghị</h1>
                        <p className="text-blue-100">Gửi phản ánh, kiến nghị của bạn về chính sách, văn bản pháp luật tới cơ quan có thẩm quyền.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-8">
                        {/* Sender info */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-gray-800 border-b pb-2 flex items-center gap-2">
                                <span className="bg-blue-100 text-[#0f4c81] w-6 h-6 rounded-full flex items-center justify-center text-sm">1</span>
                                Thông tin người gửi
                            </h3>
                            <div className="bg-[#eff6ff] border border-[#bfdbfe] rounded-xl p-3.5 sm:p-4 flex items-center gap-3 text-blue-900 text-sm">
                                <User size={18} className="text-blue-600 shrink-0" />
                                <span>Thông tin người gửi được lấy tự động từ hồ sơ cá nhân của bạn.</span>
                            </div>
                        </div>

                        {/* Feedback Details */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-gray-800 border-b pb-2 flex items-center gap-2">
                                <span className="bg-blue-100 text-[#0f4c81] w-6 h-6 rounded-full flex items-center justify-center text-sm">2</span>
                                Nội dung phản ánh kiến nghị
                            </h3>

                            {/* Target selection */}
                            <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Cấp xử lý <span className="text-red-500">*</span></label>
                                    <div className="flex gap-4">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="level"
                                                value="Trung ương"
                                                checked={formData.level === 'Trung ương'}
                                                onChange={() => handleLevelChange('Trung ương')}
                                                className="w-4 h-4 text-[#0f4c81]"
                                            />
                                            <span className="text-sm font-medium text-gray-700">Cấp trung ương</span>
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="level"
                                                value="Địa phương"
                                                checked={formData.level === 'Địa phương'}
                                                onChange={() => handleLevelChange('Địa phương')}
                                                className="w-4 h-4 text-[#0f4c81]"
                                            />
                                            <span className="text-sm font-medium text-gray-700">Cấp địa phương</span>
                                        </label>
                                    </div>
                                </div>

                                {formData.level === 'Trung ương' ? (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Cơ quan tiếp nhận <span className="text-red-500">*</span></label>
                                        <select
                                            value={formData.agency}
                                            onChange={e => { setFormData({ ...formData, agency: e.target.value }); setErrors({ ...errors, agency: null }); }}
                                            className={`w-full border rounded-lg p-2.5 bg-white ${errors.agency ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500'}`}
                                        >
                                            <option value="">-- Chọn cơ quan tiếp nhận --</option>
                                            {CENTRAL_AGENCIES.map(agency => (
                                                <option key={agency} value={agency}>{agency}</option>
                                            ))}
                                        </select>
                                        {errors.agency && <p className="text-red-500 text-xs mt-1">{errors.agency}</p>}
                                    </div>
                                ) : (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Địa phương <span className="text-red-500">*</span></label>
                                        <select
                                            value={formData.province}
                                            onChange={e => { setFormData({ ...formData, province: e.target.value }); setErrors({ ...errors, province: null }); }}
                                            className={`w-full border rounded-lg p-2.5 bg-white ${errors.province ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500'}`}
                                        >
                                            <option value="">-- Chọn địa phương --</option>
                                            {PROVINCES.map(prov => (
                                                <option key={prov} value={prov}>{prov}</option>
                                            ))}
                                        </select>
                                        {errors.province && <p className="text-red-500 text-xs mt-1">{errors.province}</p>}
                                    </div>
                                )}
                            </div>

                            {/* Legal Doc selection */}
                            <div className="relative z-10">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Văn bản pháp luật liên quan <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Tìm kiếm hoặc khai báo số hiệu, tên văn bản pháp luật..."
                                        value={docSearchQuery}
                                        onChange={e => {
                                            const val = e.target.value;
                                            setDocSearchQuery(val);
                                            setFormData({ ...formData, legalDocs: val });
                                            setShowDocDropdown(true);
                                            setErrors({ ...errors, legalDocs: null });
                                            const matched = MOCK_LEGAL_DOCS_DATA.find(d =>
                                                d.name.toLowerCase() === val.toLowerCase() ||
                                                d.soHieu.toLowerCase() === val.toLowerCase() ||
                                                d.tieuDe.toLowerCase() === val.toLowerCase()
                                            );
                                            setSelectedDoc(matched || null);
                                            if (!matched) {
                                                setFormData(prev => ({ ...prev, tableOfContent: '', content: '' }));
                                            }
                                        }}
                                        onFocus={() => setShowDocDropdown(true)}
                                        onBlur={() => setTimeout(() => setShowDocDropdown(false), 250)}
                                        className={`w-full border rounded-lg p-2.5 pl-10 ${errors.legalDocs ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500'}`}
                                    />
                                    <Search className="absolute left-3 top-3 text-gray-400" size={18} />
                                </div>
                                {errors.legalDocs && <p className="text-red-500 text-xs mt-1">{errors.legalDocs}</p>}

                                {/* Dropdown */}
                                {showDocDropdown && docSearchQuery && filteredDocs.length > 0 && (
                                    <ul className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto divide-y divide-gray-100">
                                        {filteredDocs.map((doc, idx) => (
                                            <li
                                                key={idx}
                                                className="px-4 py-2.5 hover:bg-blue-50 cursor-pointer text-sm transition-colors"
                                                onClick={() => handleSelectDoc(doc)}
                                            >
                                                <div className="font-semibold text-gray-800">{doc.name}</div>
                                                <div className="text-xs text-gray-500 line-clamp-1">{doc.tieuDe}</div>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            {/* Display Document Details if a document is selected */}
                            {selectedDoc && (
                                <div className="border border-gray-200 rounded-xl p-5 bg-white shadow-xs space-y-4">
                                    <h4 className="text-base font-bold text-gray-900">Thông tin Văn bản</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-sm">
                                        {/* Column 1 */}
                                        <div className="space-y-3">
                                            <div>
                                                <span className="font-bold text-gray-800">Tiêu đề: </span>
                                                <span className="text-gray-700 leading-relaxed">{selectedDoc.tieuDe}</span>
                                            </div>
                                            <div>
                                                <span className="font-bold text-gray-800">Số ký hiệu: </span>
                                                <span className="text-gray-700">{selectedDoc.soHieu}</span>
                                            </div>
                                            <div>
                                                <span className="font-bold text-gray-800">Ngày có hiệu lực: </span>
                                                <span className="text-gray-700">{selectedDoc.ngayHieuLuc}</span>
                                            </div>
                                            <div>
                                                <span className="font-bold text-gray-800">Ngành: </span>
                                                <span className="text-gray-700">{selectedDoc.nganh}</span>
                                            </div>
                                            <div>
                                                <span className="font-bold text-gray-800">Cơ quan ban hành: </span>
                                                <span className="text-gray-700">{selectedDoc.coQuanBanHanh}</span>
                                            </div>
                                            <div>
                                                <span className="font-bold text-gray-800">Chức danh: </span>
                                                <span className="text-gray-700">{selectedDoc.chucDanh}</span>
                                            </div>
                                        </div>

                                        {/* Column 2 */}
                                        <div className="space-y-3">
                                            <div>
                                                <span className="font-bold text-gray-800">Trích yếu: </span>
                                                <span className="text-gray-700 leading-relaxed">{selectedDoc.trichYeu}</span>
                                            </div>
                                            <div>
                                                <span className="font-bold text-gray-800">Ngày ban hành: </span>
                                                <span className="text-gray-700">{selectedDoc.ngayBanHanh}</span>
                                            </div>
                                            <div>
                                                <span className="font-bold text-gray-800">Loại văn bản: </span>
                                                <span className="text-gray-700">{selectedDoc.loaiVanBan}</span>
                                            </div>
                                            <div>
                                                <span className="font-bold text-gray-800">Tình trạng hiệu lực: </span>
                                                <span className="text-gray-700">{selectedDoc.tinhTrangHieuLuc}</span>
                                            </div>
                                            <div>
                                                <span className="font-bold text-gray-800">Người ký: </span>
                                                <span className="text-gray-700">{selectedDoc.nguoiKy}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Files */}
                                    {selectedDoc.files && selectedDoc.files.length > 0 && (
                                        <div className="pt-3 border-t border-gray-100 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                                            <span className="font-bold text-gray-800">File đính kèm:</span>
                                            <div className="flex flex-wrap gap-3">
                                                {selectedDoc.files.map((file, idx) => (
                                                    <a
                                                        key={idx}
                                                        href={file.url || '#'}
                                                        onClick={(e) => e.preventDefault()}
                                                        className="text-blue-600 hover:text-blue-800 hover:underline"
                                                    >
                                                        {file.name}
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Table of Contents (Mục lục) */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Mục lục
                                </label>
                                <select
                                    value={formData.tableOfContent || ''}
                                    onChange={e => handleTableOfContentChange(e.target.value)}
                                    disabled={!selectedDoc || !selectedDoc.mucLuc || selectedDoc.mucLuc.length === 0}
                                    className={`w-full border rounded-lg p-2.5 bg-white ${!selectedDoc
                                            ? 'bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed'
                                            : 'border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 text-gray-700'
                                        }`}
                                >
                                    <option value="">
                                        {selectedDoc ? '-- Chọn chương, mục, điều cần phản ánh (tùy chọn) --' : '-- Vui lòng chọn văn bản pháp luật để xem mục lục --'}
                                    </option>
                                    {selectedDoc && selectedDoc.mucLuc && selectedDoc.mucLuc.map((item, idx) => (
                                        <option key={idx} value={item}>
                                            {item}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nội dung chi tiết <span className="text-red-500">*</span></label>
                                <textarea
                                    rows={6}
                                    placeholder="Mô tả chi tiết nội dung phản ánh, kiến nghị của bạn..."
                                    value={formData.content}
                                    onChange={e => { setFormData({ ...formData, content: e.target.value }); setErrors({ ...errors, content: null }); }}
                                    className={`w-full border rounded-lg p-3 resize-y ${errors.content ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500'}`}
                                ></textarea>
                                {errors.content && <p className="text-red-500 text-xs mt-1">{errors.content}</p>}
                            </div>

                        </div>

                        {/* Confirmation and Actions */}
                        <div className="pt-6 border-t border-gray-200">
                            <label className="flex items-start gap-3 cursor-pointer mb-6">
                                <input
                                    type="checkbox"
                                    checked={formData.termsAgreed}
                                    onChange={e => { setFormData({ ...formData, termsAgreed: e.target.checked }); setErrors({ ...errors, termsAgreed: null }); }}
                                    className="mt-1 w-5 h-5 rounded border-gray-300 text-[#0f4c81] focus:ring-[#0f4c81]"
                                />
                                <div>
                                    <span className="text-sm font-medium text-gray-800">Tôi xác nhận thông tin phản ánh là trung thực và chịu trách nhiệm về nội dung đã gửi.</span>
                                    {errors.termsAgreed && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} /> {errors.termsAgreed}</p>}
                                </div>
                            </label>

                            <div className="flex flex-col-reverse sm:flex-row gap-4 justify-end">
                                <button type="button" onClick={handleCancel} className="px-6 py-2.5 sm:py-3 border-2 border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition w-full sm:w-auto">
                                    Hủy bỏ
                                </button>
                                <button type="submit" className="px-8 py-2.5 sm:py-3 bg-[#0f4c81] text-white font-bold rounded-xl hover:bg-blue-800 hover:shadow-lg hover:-translate-y-0.5 transition-all w-full sm:w-auto flex items-center justify-center gap-2">
                                    <Send size={18} /> Gửi phản ánh
                                </button>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreatePhanAnhKienNghiPage;

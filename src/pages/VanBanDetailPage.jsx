import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
    ChevronRight, Copy, Check, Download, FileText, Eye, ArrowLeft,
    BookOpen, List, GitBranch, Clock, File, Link2, Upload,
    Maximize2, RotateCw, ZoomIn, ZoomOut, Printer, Search, Info,
    BookmarkPlus, FileEdit, MessageCircle, MessageSquarePlus, Mail,
    ChevronDown, Plus, X, Folder, ShieldCheck, User
} from 'lucide-react';
import { THONG_TU_78_CONTENT } from '../data/thongTu78';

// ── Mock document data ────────────────────────────────────────────────────────
const MOCK_DOCS = {
    '1': {
        id: 1,
        soHieu: '',
        title: 'Hiến pháp Nước Cộng hòa xã hội chủ nghĩa Việt Nam',
        status: 'active',
        ngayHieuLuc: '01/01/2014',
        ngayCapNhat: '28/11/2013',
        ngayBanHanh: '28/11/2013',
        loai: 'Hiến pháp',
        cqBanHanh: 'QUỐC HỘI',
        nguoiKy: 'Nguyễn Sinh Hùng',
        chucDanh: 'CHỦ TỊCH QUỐC HỘI',
        linhVuc: ['Bộ máy nhà nước'],
        nganh: 'Nhà nước',
        trichYeu: 'Hiến pháp\nnước Cộng hòa xã hội chủ nghĩa Việt Nam năm 2013',
        soCongBao: '01',
        ngayCongBao: '05/12/2013',
        ngayHetHieuLuc: '',
        apDung: 'Đã biết',
        dinhKiem: false,
        diaDanh: 'Hà Nội',
        content: [
            { id: 'loi-noi-dau-title', type: 'quyetdinh', text: 'LỜI NÓI ĐẦU' },
            { id: 'loi-noi-dau-content', type: 'text', text: 'Trải qua mấy nghìn năm lịch sử, Nhân dân Việt Nam lao động cần cù, sáng tạo, chiến đấu anh dũng để dựng nước và giữ nước, hun đúc nên truyền thống yêu nước, đoàn kết, nhân nghĩa, kiên cường, bất khuất và xây dựng nên nền văn hiến Việt Nam.\n\nTừ năm 1930, dưới sự lãnh đạo của Đảng Cộng sản Việt Nam do Chủ tịch Hồ Chí Minh sáng lập và rèn luyện, Nhân dân ta tiến hành cuộc đấu tranh lâu dài, đầy gian khổ, hy sinh vì độc lập, tự do của dân tộc, vì hạnh phúc của Nhân dân...' },
            { id: 'chuong1', type: 'chuong', label: 'Chương I', text: 'CHẾ ĐỘ CHÍNH TRỊ' },
            { id: 'dieu1', type: 'dieu', label: 'Điều 1.', text: 'Nước Cộng hòa xã hội chủ nghĩa Việt Nam là một nước độc lập, có chủ quyền, thống nhất và toàn vẹn lãnh thổ, bao gồm đất liền, hải đảo, vùng biển và vùng trời.' },
            { id: 'dieu2', type: 'dieu', label: 'Điều 2.', text: '1. Nhà nước Cộng hòa xã hội chủ nghĩa Việt Nam là nhà nước pháp quyền xã hội chủ nghĩa của Nhân dân, do Nhân dân, vì Nhân dân.\n2. Nước Cộng hòa xã hội chủ nghĩa Việt Nam do Nhân dân làm chủ; tất cả quyền lực nhà nước thuộc về Nhân dân mà nền tảng là liên minh giữa giai cấp công nhân với giai cấp nông dân và đội ngũ trí thức.\n3. Quyền lực nhà nước là thống nhất, có sự phân công, phối hợp, kiểm soát giữa các cơ quan nhà nước trong việc thực hiện các quyền lập pháp, hành pháp, tư pháp.' },
            { id: 'dieu4', type: 'dieu', label: 'Điều 4.', text: '1. Đảng Cộng sản Việt Nam - Đội tiên phong của giai cấp công nhân, đồng thời là đội tiên phong của Nhân dân lao động và của dân tộc Việt Nam, đại biểu trung thành lợi ích của giai cấp công nhân, nhân dân lao động và của cả dân tộc, lấy chủ nghĩa Mác - Lê nin và tư tưởng Hồ Chí Minh làm nền tảng tư tưởng, là lực lượng lãnh đạo Nhà nước và xã hội.' },
            { id: 'chuong2', type: 'chuong', label: 'Chương II', text: 'QUYỀN CON NGƯỜI, QUYỀN VÀ NGHĨA VỤ CƠ BẢN CỦA CÔNG DÂN' },
            { id: 'dieu14', type: 'dieu', label: 'Điều 14.', text: '1. Ở nước Cộng hòa xã hội chủ nghĩa Việt Nam, các quyền con người, quyền công dân về chính trị, dân sự, kinh tế, văn hóa, xã hội được công nhận, tôn trọng, bảo vệ, bảo đảm theo Hiến pháp và pháp luật.' }
        ]
    },
    '2': {
        id: 2,
        soHieu: '78/2014/TT-BTC',
        title: 'Thông tư 78/2014/TT-BTC hướng dẫn thi hành Nghị định 218/2013/NĐ-CP hướng dẫn Luật Thuế thu nhập doanh nghiệp',
        status: 'active',
        ngayHieuLuc: '02/08/2014',
        ngayCapNhat: '18/06/2014',
        ngayBanHanh: '18/06/2014',
        loai: 'Thông tư',
        cqBanHanh: 'BỘ TÀI CHÍNH',
        nguoiKy: 'Đỗ Hoàng Anh Tuấn',
        chucDanh: 'THỨ TRƯỞNG',
        linhVuc: ['Thuế - Phí - Lệ phí'],
        nganh: 'Tài chính',
        trichYeu: 'Hướng dẫn thi hành Nghị định số 218/2013/NĐ-CP ngày 26/12/2013 của Chính phủ quy định và hướng dẫn thi hành\nLuật Thuế thu nhập doanh nghiệp',
        soCongBao: '556',
        ngayCongBao: '25/06/2014',
        ngayHetHieuLuc: '',
        apDung: 'Đã biết',
        dinhKiem: true,
        diaDanh: 'Hà Nội',
        content: THONG_TU_78_CONTENT
    },
    '4': {
        id: 4, soHieu: '101/2015/QH13', loai: 'Bộ luật', title: 'Bộ luật Tố tụng hình sự số 101/2015/QH13', status: 'active',
        cqBanHanh: 'QUỐC HỘI', chucDanh: 'CHỦ TỊCH QUỐC HỘI', nguoiKy: 'Nguyễn Sinh Hùng', linhVuc: ['Hình sự'], nganh: 'Tư pháp', trichYeu: 'Bộ luật Tố tụng hình sự năm 2015',
        ngayHieuLuc: '01/01/2018', ngayCapNhat: '27/11/2015', ngayBanHanh: '27/11/2015', soCongBao: '123', ngayCongBao: '15/12/2015', ngayHetHieuLuc: '', apDung: 'Đã biết', diaDanh: 'Hà Nội',
        content: [{ id: '1', type: 'text', text: 'NỘI DUNG MẪU:\nĐây là trang chi tiết của Bộ luật Tố tụng hình sự. Nội dung này đang là dữ liệu giả lập để hiển thị tính năng điều hướng thành công.' }]
    },
    '5': {
        id: 5, soHieu: '14/2008/QH12', loai: 'Luật', title: 'Luật Thuế thu nhập doanh nghiệp số 14/2008/QH12', status: 'active',
        cqBanHanh: 'QUỐC HỘI', chucDanh: 'CHỦ TỊCH QUỐC HỘI', nguoiKy: 'Nguyễn Phú Trọng', linhVuc: ['Thuế - Phí - Lệ phí'], nganh: 'Tài chính', trichYeu: 'Luật Thuế thu nhập doanh nghiệp',
        ngayHieuLuc: '01/01/2009', ngayCapNhat: '03/06/2008', ngayBanHanh: '03/06/2008', soCongBao: '456', ngayCongBao: '20/06/2008', ngayHetHieuLuc: '', apDung: 'Đã biết', diaDanh: 'Hà Nội',
        content: [{ id: '1', type: 'text', text: 'NỘI DUNG MẪU:\nĐây là trang chi tiết của Luật Thuế thu nhập doanh nghiệp năm 2008. Văn bản này đã được chọn làm ví dụ điều hướng.' }]
    },
    '6': {
        id: 6, soHieu: '32/2013/QH13', loai: 'Luật', title: 'Luật sửa đổi, bổ sung một số điều của Luật Thuế thu nhập doanh nghiệp', status: 'active',
        cqBanHanh: 'QUỐC HỘI', chucDanh: 'CHỦ TỊCH QUỐC HỘI', nguoiKy: 'Nguyễn Sinh Hùng', linhVuc: ['Thuế - Phí - Lệ phí'], nganh: 'Tài chính', trichYeu: 'Luật sửa đổi, bổ sung Luật Thuế thu nhập doanh nghiệp',
        ngayHieuLuc: '01/01/2014', ngayCapNhat: '19/06/2013', ngayBanHanh: '19/06/2013', soCongBao: '789', ngayCongBao: '05/07/2013', ngayHetHieuLuc: '', apDung: 'Đã biết', diaDanh: 'Hà Nội',
        content: [{ id: '1', type: 'text', text: 'NỘI DUNG MẪU:\nĐây là trang chi tiết của Luật sửa đổi số 32/2013/QH13. Điều hướng hoạt động hoàn hảo.' }]
    },
    '7': {
        id: 7, soHieu: '218/2013/NĐ-CP', loai: 'Nghị định', title: 'Nghị định quy định chi tiết và hướng dẫn thi hành Luật Thuế thu nhập doanh nghiệp', status: 'active',
        cqBanHanh: 'CHÍNH PHỦ', chucDanh: 'THỦ TƯỚNG', nguoiKy: 'Nguyễn Tấn Dũng', linhVuc: ['Thuế - Phí - Lệ phí'], nganh: 'Tài chính', trichYeu: 'Nghị định quy định chi tiết và hướng dẫn thi hành Luật Thuế thu nhập doanh nghiệp',
        ngayHieuLuc: '15/02/2014', ngayCapNhat: '26/12/2013', ngayBanHanh: '26/12/2013', soCongBao: '101', ngayCongBao: '10/01/2014', ngayHetHieuLuc: '', apDung: 'Đã biết', diaDanh: 'Hà Nội',
        content: [{ id: '1', type: 'text', text: 'NỘI DUNG MẪU:\nĐây là trang chi tiết của Nghị định 218/2013/NĐ-CP liên quan đến Luật Thuế thu nhập doanh nghiệp.' }]
    },
    '8': {
        id: 8, soHieu: '203/2025/QH15', loai: 'Nghị quyết', title: 'Nghị quyết số 203/2025/QH15 sửa đổi bổ sung một số điều của Hiến pháp', status: 'active',
        cqBanHanh: 'QUỐC HỘI', chucDanh: 'CHỦ TỊCH QUỐC HỘI', nguoiKy: 'Trần Thanh Mẫn', linhVuc: ['Bộ máy nhà nước'], nganh: 'Nhà nước', trichYeu: 'Nghị quyết sửa đổi bổ sung Hiến pháp',
        ngayHieuLuc: '01/01/2026', ngayCapNhat: '28/11/2025', ngayBanHanh: '28/11/2025', soCongBao: '11', ngayCongBao: '05/12/2025', ngayHetHieuLuc: '', apDung: 'Đã biết', diaDanh: 'Hà Nội',
        content: [{ id: '1', type: 'text', text: 'NỘI DUNG MẪU:\nĐây là trang chi tiết của Nghị quyết số 203/2025/QH15 sửa đổi, bổ sung Hiến pháp.' }]
    }
};

const getMockDoc = (id) => MOCK_DOCS[id] || MOCK_DOCS['1'];

const STATUS_MAP = {
    active: { label: 'Còn Hiệu lực', cls: 'bg-green-50 text-green-700 border-green-200' },
    expired: { label: 'Hết Hiệu lực', cls: 'bg-red-50 text-red-700 border-red-200' },
    pending: { label: 'Chưa có Hiệu lực', cls: 'bg-amber-50 text-amber-700 border-amber-200' },
};

const TABS = [
    { id: 'noi-dung', label: 'Nội dung', icon: BookOpen },
    { id: 'thuoc-tinh', label: 'Thuộc tính', icon: List },
    { id: 'luoc-do', label: 'Lược đồ', icon: GitBranch },
    { id: 'van-ban-goc', label: 'Văn bản gốc', icon: File },
    { id: 'van-ban-lq', label: 'Văn bản liên quan', icon: Link2 },
    { id: 'tai-ve', label: 'Tải về', icon: Upload },
    { id: 'chu-de-lq', label: 'Chủ đề thảo luận', icon: MessageCircle },
];

// ── Quick action buttons (shared in list rows) ────────────────────────────────
const QuickBtns = ({ onTab }) => (
    <div className="flex flex-wrap gap-1.5 mt-2">
        {['Tổng quan', 'Nội dung', 'Văn bản gốc', 'Hiệu lực', 'Văn bản liên quan'].map(l => (
            <button key={l}
                className="text-[11px] px-2.5 py-1 border border-gray-300 rounded hover:border-blue-400 hover:text-blue-600 transition-colors text-gray-600">
                {l}
            </button>
        ))}
        <button className="text-[11px] px-2.5 py-1 border border-gray-300 rounded hover:border-blue-400 hover:text-blue-600 transition-colors text-gray-600 flex items-center gap-1"
            onClick={() => onTab && onTab('tai-ve')}>
            ↑ Tải về
        </button>
    </div>
);

const MOD_COLORS = {
    'sua_doi': 'text-[#ef4444]',
    'bo_sung': 'text-[#a855f7]',
    'dinh_chinh': 'text-[#14b8a6]',
    'huong_dan': 'text-[#ec4899]'
};

const MODIFICATIONS = [
    {
        id: 'mod1',
        textMatch: 'Số thuế thu nhập doanh nghiệp phải nộp trong kỳ tính thuế bằng thu nhập tính thuế nhân với',
        type: 'sua_doi',
        tooltipMessage: 'Điểm này được sửa đổi bởi Khoản 1 Điều 1 Luật sửa đổi, bổ sung một số điều của Luật Thuế thu nhập doanh nghiệp',
        originalContent: `Điều 3. Phương pháp tính thuế\n\n1. Số thuế thu nhập doanh nghiệp phải nộp trong kỳ tính thuế bằng thu nhập tính thuế nhân với thuế suất. Trừ trường hợp đặc biệt do Chính phủ quy định.`,
        modifiedContent: `Điều 1. Sửa đổi, bổ sung một số điều của Luật Thuế thu nhập doanh nghiệp\n\n1. Sửa đổi, bổ sung Điều 3 như sau:\n\n"1. Thuế thu nhập doanh nghiệp được tính bằng thu nhập chịu thuế nhân với mức thuế suất chung 20%, đối với các trường hợp được hưởng ưu đãi hoặc doanh nghiệp có doanh thu trong năm không quá 200 tỷ đồng, thuế suất sẽ là 17% hoặc 15% tuỳ theo lĩnh vực và địa bàn thực tế."`
    },
    {
        id: 'mod2',
        textMatch: 'Đơn vị sự nghiệp công lập, ngoài công lập có sản xuất kinh doanh hàng hóa',
        type: 'bo_sung',
        tooltipMessage: 'Khoản này được bổ sung bởi Điều 2 Nghị định 12/2015/NĐ-CP',
        originalContent: `b) Đơn vị sự nghiệp công lập, ngoài công lập có sản xuất kinh doanh hàng hóa, dịch vụ có thu nhập chịu thuế trong tất cả các lĩnh vực.`,
        modifiedContent: `Bổ sung thêm đối tượng chịu thuế mới:\n\n"Đơn vị sự nghiệp công lập, ngoài công lập có sản xuất kinh doanh hàng hóa...\nNgoài ra, bổ sung thêm đối tượng bao gồm cả các hình thức sự nghiệp giáo dục, cơ sở y tế ngoài công lập nếu có hoạt động sinh lời."`
    },
    {
        id: 'mod3',
        textMatch: 'Cơ sở thường trú của doanh nghiệp nước ngoài là cơ sở sản xuất, kinh doanh mà thông qua cơ sở này',
        type: 'huong_dan',
        tooltipMessage: 'Đoạn này được hướng dẫn chi tiết bởi Thông tư 96/2015/TT-BTC',
        originalContent: `Cơ sở thường trú của doanh nghiệp nước ngoài là cơ sở sản xuất, kinh doanh mà thông qua cơ sở này, doanh nghiệp nước ngoài tiến hành một phần hoặc toàn bộ hoạt động sản xuất, kinh doanh tại Việt Nam, bao gồm:`,
        modifiedContent: `Hướng dẫn cụ thể cho việc xác định cơ sở thường trú:\n\n"Theo Thông tư 96/2015/TT-BTC, cơ sở thường trú để tính thuế thu nhập doanh nghiệp đối với tổ chức nước ngoài được xác định mở rộng bao hàm cả trường hợp tổ chức đó đưa người sang Việt Nam cung cấp dịch vụ trong khoảng thời gian trên 183 ngày trong giai đoạn 12 tháng liên tục."`
    },
    {
        id: 'mod4',
        textMatch: 'doanh nghiệp có doanh thu, chi phí và thu nhập khác bằng ngoại tệ thì phải quy đổi ngoại tệ ra đồng Việt Nam theo tỷ giá giao dịch bình quân trên thị trường ngoại tệ liên ngân hàng',
        type: 'dinh_chinh',
        tooltipMessage: 'Quy định này đã được đính chính bởi Công văn 130/TCT-CS',
        originalContent: `Doanh nghiệp có doanh thu, chi phí và thu nhập khác bằng ngoại tệ thì phải quy đổi ngoại tệ ra đồng Việt Nam theo tỷ giá giao dịch bình quân trên thị trường ngoại tệ liên ngân hàng do Ngân hàng Nhà nước Việt Nam công bố tại thời điểm phát sinh.`,
        modifiedContent: `Đính chính về tỷ giá quy đổi:\n\n"Thực hiện quy đổi theo tỷ giá mua vào/bán ra của ngân hàng thương mại nơi doanh nghiệp mở tài khoản giao dịch ngoại tệ tại thời điểm phát sinh thay vì giao dịch bình quân liên ngân hàng do Ngân hàng Nhà nước công bố."`
    },
    {
        id: 'mod5',
        textMatch: 'Trường hợp doanh nghiệp thực hiện chuyển đổi kỳ tính thuế thu nhập doanh nghiệp',
        type: 'sua_doi',
        tooltipMessage: 'Khoản này được sửa đổi bởi Thông tư số 96/2015/TT-BTC',
        originalContent: `Trường hợp doanh nghiệp thực hiện chuyển đổi kỳ tính thuế thu nhập doanh nghiệp (bao gồm cả chuyển đổi kỳ tính thuế từ năm dương lịch sang năm tài chính hoặc ngược lại) thì kỳ tính thuế thu nhập doanh nghiệp của năm chuyển đổi không vượt quá 12 tháng.`,
        modifiedContent: `Sửa đổi nguyên tắc chuyển đổi kỳ tính thuế:\n\n"Năm chuyển đổi kỳ tính thuế doanh nghiệp được quyền lựa chọn gộp các tháng lẻ vào năm trước hoặc năm tiếp theo liền kề, tuy nhiên quyết toán gộp kỳ tính thuế này đảm bảo không quá thời hạn 15 tháng theo quy định doanh nghiệp mới thành lập."`
    },
    {
        id: 'mod6',
        textMatch: 'Thu nhập chịu thuế trong kỳ tính thuế bao gồm thu nhập từ hoạt động sản xuất, kinh doanh hàng hóa',
        type: 'bo_sung',
        tooltipMessage: 'Khoản này được bổ sung bởi Luật Thuế số 71/2014/QH13',
        originalContent: `Thu nhập chịu thuế trong kỳ tính thuế bao gồm thu nhập từ hoạt động sản xuất, kinh doanh hàng hóa, dịch vụ và thu nhập khác.`,
        modifiedContent: `Bổ sung thêm thu nhập chịu thuế:\n\n"Bao gồm cả thu nhập từ hoạt động sản xuất, kinh doanh ở ngoài Việt Nam (nếu có)."`,
    },
    {
        id: 'mod7',
        textMatch: 'Thu nhập từ hoạt động chuyển nhượng bất động sản, chuyển nhượng dự án đầu tư',
        type: 'huong_dan',
        tooltipMessage: 'Đoạn này được hướng dẫn chi tiết bởi Thông tư 96/2015/TT-BTC',
        originalContent: `Thu nhập từ hoạt động chuyển nhượng bất động sản, chuyển nhượng dự án đầu tư... phải hạch toán riêng để kê khai nộp thuế.`,
        modifiedContent: `Hướng dẫn trường hợp bù trừ lỗ:\n\n"Doanh nghiệp được phép bù trừ lỗ chuyển nhượng bất động sản với lãi của hoạt động sản xuất kinh doanh thông thường theo quy định mới."`,
    },
    {
        id: 'mod8',
        textMatch: 'Doanh nghiệp trong kỳ tính thuế có các hoạt động chuyển nhượng bất động sản',
        type: 'dinh_chinh',
        tooltipMessage: 'Quy định này đã được đính chính bởi Công văn 130/TCT-CS',
        originalContent: `Doanh nghiệp trong kỳ tính thuế có các hoạt động chuyển nhượng bất động sản, chuyển nhượng dự án đầu tư... nếu bị lỗ thì số lỗ này được bù trừ với lãi của hoạt động sản xuất kinh doanh.`,
        modifiedContent: `Đính chính:\n\n"Hướng dẫn chỉ áp dụng từ kỳ tính thuế 2014 trở đi, không áp dụng hồi tố."`,
    },
    {
        id: 'mod9',
        textMatch: 'Trường hợp doanh nghiệp làm thủ tục giải thể doanh nghiệp',
        type: 'sua_doi',
        tooltipMessage: 'Nội dung này được sửa đổi bởi Nghị định 12/2015/NĐ-CP',
        originalContent: `Trường hợp doanh nghiệp làm thủ tục giải thể doanh nghiệp, sau khi có quyết định giải thể nếu có chuyển nhượng bất động sản là tài sản cố định...`,
        modifiedContent: `Sửa đổi thủ tục giải thể:\n\n"Doanh nghiệp phải ưu tiên thanh toán các khoản nợ thuế trước khi bù trừ lỗ từ hoạt động sản xuất kinh doanh."`,
    },
    {
        id: 'mod10',
        textMatch: 'Doanh thu để tính thu nhập chịu thuế là toàn bộ tiền bán hàng hóa, tiền gia công',
        type: 'bo_sung',
        tooltipMessage: 'Khoản này được bổ sung bởi Thông tư 130/2016/TT-BTC',
        originalContent: `Doanh thu để tính thu nhập chịu thuế là toàn bộ tiền bán hàng hóa, tiền gia công, tiền cung cấp dịch vụ bao gồm cả khoản trợ giá, phụ thu, phụ trội.`,
        modifiedContent: `Bổ sung:\n\n"Bao gồm cả các khoản tiền phạt vi phạm hợp đồng mà doanh nghiệp thu được từ đối tác."`,
    },
    {
        id: 'mod11',
        textMatch: 'Trường hợp doanh nghiệp có hoạt động kinh doanh dịch vụ mà khách hàng trả tiền trước cho nhiều năm',
        type: 'huong_dan',
        tooltipMessage: 'Mục này đã có văn bản hướng dẫn số 96/2015/TT-BTC',
        originalContent: `Trường hợp doanh nghiệp có hoạt động kinh doanh dịch vụ mà khách hàng trả tiền trước cho nhiều năm thì doanh thu để tính thu nhập chịu thuế được phân bổ cho số năm trả tiền trước.`,
        modifiedContent: `Hướng dẫn lựa chọn:\n\n"Doanh nghiệp có thể chọn phân bổ theo từng năm hoặc ghi nhận toàn bộ vào một năm tùy theo chiến lược kinh doanh và ưu đãi thuế đang được hưởng."`,
    },
    {
        id: 'mod12',
        textMatch: 'Đối với hoạt động bán hàng hóa là thời điểm chuyển giao quyền sở hữu',
        type: 'dinh_chinh',
        tooltipMessage: 'Quy định này được làm rõ bởi Công văn của Tổng Cục Thuế',
        originalContent: `Đối với hoạt động bán hàng hóa là thời điểm chuyển giao quyền sở hữu, quyền sử dụng hàng hóa cho người mua.`,
        modifiedContent: `Đính chính áp dụng:\n\n"Chỉ tính thời điểm đã lập hóa đơn nếu hóa đơn lập trước thời điểm chuyển giao quyền sở hữu."`,
    },
    {
        id: 'mod13',
        textMatch: 'Đối với hàng hóa, dịch vụ bán theo phương thức trả góp, trả chậm',
        type: 'sua_doi',
        tooltipMessage: 'Sửa đổi bởi Luật Thuế sửa đổi 2013',
        originalContent: `Đối với hàng hóa, dịch vụ bán theo phương thức trả góp, trả chậm là tiền bán hàng hóa, dịch vụ trả tiền một lần, không bao gồm tiền lãi trả góp.`,
        modifiedContent: `Sửa đổi:\n\n"Doanh thu tính thuế là số tiền bán hàng hóa thu một lần, còn tiền lãi trả chậm được hạch toán vào thu nhập tài chính."`,
    },
    {
        id: 'mod14',
        textMatch: 'Đối với hàng hóa của các đơn vị giao đại lý, ký gửi và nhận đại lý',
        type: 'bo_sung',
        tooltipMessage: 'Bổ sung theo Nghị định số 12/2015/NĐ-CP',
        originalContent: `Đối với hàng hóa của các đơn vị giao đại lý, ký gửi và nhận đại lý, ký gửi theo hợp đồng đại lý, ký gửi bán đúng giá hưởng hoa hồng.`,
        modifiedContent: `Bổ sung đại lý đa cấp:\n\n"Quy định này được mở rộng bao gồm cả đại lý bán hàng đa cấp với mức hoa hồng cố định."`,
    },
    {
        id: 'mod15',
        textMatch: 'Đối với hoạt động cho thuê tài sản là số tiền bên thuê trả từng kỳ theo hợp đồng thuê',
        type: 'dinh_chinh',
        tooltipMessage: 'Đính chính bởi Bộ Tài Chính',
        originalContent: `Đối với hoạt động cho thuê tài sản là số tiền bên thuê trả từng kỳ theo hợp đồng thuê.`,
        modifiedContent: `Đính chính văn bản:\n\n"Trong trường hợp bên thuê trả trước một lần thì áp dụng nguyên tắc phân bổ quy định tại khoản 1 Điều này."`,
    }
];

const LINK_MAP = [
    { text: 'Nghị định số 218/2013/NĐ-CP', url: '/van-ban/7' },
    { text: 'Luật Thuế thu nhập doanh nghiệp số 14/2008/QH12', url: '/van-ban/5' },
    { text: 'Luật Thuế thu nhập doanh nghiệp', url: '/van-ban/5' },
    { text: 'Luật sửa đổi, bổ sung một số điều của Luật Thuế thu nhập doanh nghiệp số 32/2013/QH13', url: '/van-ban/6' },
    { text: '14/2008/QH12', url: '/van-ban/5' },
    { text: '32/2013/QH13', url: '/van-ban/6' },
    { text: '218/2013/NĐ-CP', url: '/van-ban/7' },
    { text: '118/2008/NĐ-CP', url: '/van-ban/9' }
];

const renderTextWithLinks = (text) => {
    if (!text) return null;

    const sortedLinks = [...LINK_MAP].sort((a, b) => b.text.length - a.text.length);
    const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${sortedLinks.map(l => escapeRegExp(l.text)).join('|')})`, 'g');

    const parts = text.split(regex);

    return parts.map((part, i) => {
        const link = sortedLinks.find(l => l.text === part);
        if (link) {
            return (
                <Link key={i} to={link.url} target="_blank" rel="noopener noreferrer" className="text-[#0056b3] hover:text-[#004494] font-medium underline">
                    {part}
                </Link>
            );
        }
        return <span key={i}>{part.split('\n').map((line, j) => <React.Fragment key={j}>{j > 0 && <br />}{line}</React.Fragment>)}</span>;
    });
};

// ── Tab: Nội dung (UC46 MH02) ─────────────────────────────────────────────────
const TabNoiDung = ({ doc, tocOpen, setTocOpen }) => {
    const navigate = useNavigate();
    const [activeToc, setActiveToc] = useState('');
    const [highlightedSection, setHighlightedSection] = useState(null);
    const [modPopup, setModPopup] = useState(null);
    const [utilsOpen, setUtilsOpen] = useState(true);
    const [showCollectionModal, setShowCollectionModal] = useState(false);
    const [showNoteModal, setShowNoteModal] = useState(false);

    // Fake Collections State (mocked with localStorage)
    const [collections, setCollections] = useState(() => {
        const saved = localStorage.getItem('cplqg_collections');
        return saved ? JSON.parse(saved) : [{ id: 1, name: 'Quan trọng', docs: [] }];
    });
    const [newCollectionName, setNewCollectionName] = useState('');
    const [selectedCollection, setSelectedCollection] = useState(1);
    const [saveSuccess, setSaveSuccess] = useState('');

    const editorRef = React.useRef(null);
    const lastEditorRange = React.useRef(null);
    const [notePos, setNotePos] = useState({
        x: 30,
        y: typeof window !== 'undefined' ? Math.max(20, window.innerHeight - 560) : 20
    });
    const isDragging = React.useRef(false);
    const dragOffset = React.useRef({ x: 0, y: 0 });
    const [noteSaveSuccess, setNoteSaveSuccess] = useState(false);
    const [selectedTextPopup, setSelectedTextPopup] = useState(null);

    // Email states
    const [showEmailModal, setShowEmailModal] = useState(false);
    const [emailData, setEmailData] = useState({ to: '', subject: '', content: '' });

    // Focus editor when Note Modal opens
    React.useEffect(() => {
        if (showNoteModal && editorRef.current) {
            editorRef.current.focus();
            const range = document.createRange();
            range.selectNodeContents(editorRef.current);
            range.collapse(false);
            const sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
            lastEditorRange.current = range.cloneRange();
        }
    }, [showNoteModal]);

    React.useEffect(() => {
        if (showNoteModal) {
            if (editorRef.current) {
                editorRef.current.innerHTML = localStorage.getItem(`cplqg_note_${doc?.id}`) || '';
            }
        }
    }, [showNoteModal, doc?.id]);

    React.useEffect(() => {
        const handleSelection = () => {
            if (!showNoteModal) {
                setSelectedTextPopup(null);
                return;
            }

            const selection = window.getSelection();
            if (selection && selection.toString().trim() !== '') {
                if (editorRef.current && editorRef.current.contains(selection.anchorNode)) {
                    lastEditorRange.current = selection.getRangeAt(0).cloneRange();
                    setSelectedTextPopup(null);
                    return;
                }

                const range = selection.getRangeAt(0);
                const rect = range.getBoundingClientRect();

                setSelectedTextPopup({
                    text: selection.toString().trim(),
                    x: rect.left + rect.width / 2,
                    y: rect.top - 10
                });
            } else {
                if (selection && selection.rangeCount > 0 && editorRef.current && editorRef.current.contains(selection.anchorNode)) {
                    lastEditorRange.current = selection.getRangeAt(0).cloneRange();
                }
                setTimeout(() => setSelectedTextPopup(null), 100);
            }
        };

        document.addEventListener('mouseup', handleSelection);
        document.addEventListener('keyup', handleSelection);
        return () => {
            document.removeEventListener('mouseup', handleSelection);
            document.removeEventListener('keyup', handleSelection);
        };
    }, [showNoteModal]);

    const handleHeaderPointerDown = (e) => {
        isDragging.current = true;
        dragOffset.current = {
            x: e.clientX - notePos.x,
            y: e.clientY - notePos.y
        };
        e.currentTarget.setPointerCapture(e.pointerId);
    };

    const handleHeaderPointerMove = (e) => {
        if (!isDragging.current) return;
        setNotePos({
            x: e.clientX - dragOffset.current.x,
            y: e.clientY - dragOffset.current.y
        });
    };

    const handleHeaderPointerUp = (e) => {
        isDragging.current = false;
        e.currentTarget.releasePointerCapture(e.pointerId);
    };

    const highlightTimeoutRef = React.useRef(null);
    const content = doc?.content || [];
    const tocItems = content.filter(c => c.type === 'dieu' || c.type === 'chuong');

    const renderWithHighlight = (sec, children) => {
        const mod = MODIFICATIONS.find(m => sec.text.includes(m.textMatch));
        if (mod) {
            return (
                <span className="relative group inline cursor-pointer" onClick={() => setModPopup(mod)}>
                    <span className="bg-[#c9e6ff] transition-colors rounded-sm shadow-sm px-0.5 inline">
                        {children}
                    </span>
                    <div className="absolute left-10 bottom-full mb-2 w-[450px] bg-[#fffae6] border border-gray-400 text-gray-800 text-[13px] px-3 py-2.5 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 rounded-sm text-left font-normal !indent-0 leading-tight">
                        <div className="absolute -bottom-[5px] left-8 w-2.5 h-2.5 bg-[#fffae6] border-b border-r border-gray-400 rotate-45"></div>
                        <strong className={MOD_COLORS[mod.type]}>{mod.tooltipMessage}</strong>
                    </div>
                </span>
            );
        }
        return children;
    };

    // Auto-select first TOC
    React.useEffect(() => {
        if (!activeToc && tocItems.length > 0) setActiveToc(tocItems[0].id);
    }, [activeToc, tocItems]);

    // Track active TOC while scrolling
    React.useEffect(() => {
        if (tocItems.length === 0) return;
        const observerOptions = {
            root: null,
            rootMargin: '-10% 0px -70% 0px',
            threshold: 0
        };
        const observerCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    if (entry.target.id && tocItems.some(t => t.id === entry.target.id)) {
                        setActiveToc(entry.target.id);
                    }
                }
            });
        };
        const observer = new IntersectionObserver(observerCallback, observerOptions);
        tocItems.forEach(item => {
            const el = document.getElementById(item.id);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, [tocItems]);

    const handleTocClick = (id) => {
        setActiveToc(id);
        setHighlightedSection(id);
        
        // Scroll to element
        const el = document.getElementById(id);
        if (el) {
            // Check if window is Mobile, maybe offset is needed, but block: center is good enough
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        if (highlightTimeoutRef.current) clearTimeout(highlightTimeoutRef.current);
        highlightTimeoutRef.current = setTimeout(() => {
            setHighlightedSection(null);
        }, 5000);
    };

    return (
        <div className="flex gap-6 relative">
            {/* Content Body */}
            <div className="flex-1 min-w-0 bg-white p-8 md:p-14 border border-gray-200 shadow-sm mx-auto" style={{ maxWidth: '980px', color: '#000', fontFamily: "'Times New Roman', Times, serif" }}>

                {/* Headers */}
                <div className="flex justify-between items-start mb-10 text-[16px] leading-snug text-center">
                    <div className="w-[45%] flex flex-col items-center">
                        <span className="font-bold uppercase">{doc.cqBanHanh}</span>
                        {doc.soHieu && <div className="h-px w-24 bg-black my-1"></div>}
                        {doc.soHieu && <span>Số: {doc.soHieu}</span>}
                    </div>
                    <div className="w-[55%] flex flex-col items-center">
                        <span className="font-bold">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</span>
                        <span className="font-bold underline decoration-1 underline-offset-4">Độc lập - Tự do - Hạnh phúc</span>
                        <span className="italic mt-4">{doc.diaDanh || 'Hà Nội'}, ngày {doc.ngayBanHanh?.split('/')[0] || '..'} tháng {doc.ngayBanHanh?.split('/')[1] || '..'} năm {doc.ngayBanHanh?.split('/')[2] || '....'}</span>
                    </div>
                </div>

                {/* Title */}
                <div className="text-center mb-10">
                    {doc.loai !== 'Hiến pháp' && <h2 className="text-[18px] font-bold uppercase mb-2">{doc.loai}</h2>}
                    <p className="font-bold text-[18px] uppercase whitespace-pre-line leading-relaxed">{doc.loai === 'Quyết định' ? 'Về việc ' : ''}{doc.trichYeu}</p>
                </div>

                {/* Content Elements */}
                <div className="text-[17px] text-justify leading-relaxed space-y-0 text-gray-900">
                    {content.map(sec => (
                        <div key={sec.id} id={sec.id} className={`transition-colors duration-1000 px-2 rounded ${highlightedSection === sec.id ? 'bg-[#fff5b8]' : 'bg-transparent'}`}>
                            {sec.type === 'cancu' && (
                                <div className="italic text-justify indent-10 mb-1">
                                    {renderTextWithLinks(sec.text)}
                                </div>
                            )}
                            {sec.type === 'quyetdinh' && (
                                <p className="italic text-justify indent-10 mt-1 mb-4">{renderTextWithLinks(sec.text)}</p>
                            )}
                            {sec.type === 'text' && (
                                <div className="text-justify indent-10 mb-1">
                                    {renderWithHighlight(sec, renderTextWithLinks(sec.text))}
                                </div>
                            )}
                            {sec.type === 'chuong' && (
                                <div className="text-center mt-8 mb-6 leading-relaxed">
                                    <h3 className="font-bold uppercase text-[18px]">{sec.label}</h3>
                                    {sec.text && <p className="font-bold uppercase text-[18px] mt-1">{renderTextWithLinks(sec.text)}</p>}
                                </div>
                            )}
                            {sec.type === 'dieu' && (
                                <p className="font-bold text-justify mb-1 mt-3">
                                    {sec.label} {renderTextWithLinks(sec.text)}
                                </p>
                            )}
                            {sec.type === 'khoan' && (
                                <div className="text-justify indent-10 mb-1">
                                    {renderWithHighlight(sec, (
                                        <>
                                            {sec.label && <span className="mr-1">{sec.label}</span>}
                                            {renderTextWithLinks(sec.text)}
                                        </>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Footer Signatures */}
                <div className="flex justify-between items-start mt-16 text-[17px]">
                    <div className="w-1/2">
                        <p className="font-bold italic mb-1">Nơi nhận:</p>
                        <ul className="text-[14px] leading-snug space-y-1">
                            <li>- Như Điều {content.find(c => c.text.toLowerCase().includes('thi hành'))?.label?.replace('Điều ', '').replace('.', '') || '...'};</li>
                            <li>- Thủ tướng Chính phủ (để b/c);</li>
                            <li>- Các Thứ trưởng (để b/c);</li>
                            <li>- Cổng TTĐT Bộ;</li>
                            <li>- Lưu: VT.</li>
                        </ul>
                    </div>
                    <div className="w-1/2 text-center">
                        <p className="font-bold uppercase mb-20 whitespace-pre-line">{doc.chucDanh === 'THỨ TRƯỞNG' ? 'KT. BỘ TRƯỞNG\nTHỨ TRƯỞNG' : doc.chucDanh}</p>
                        <p className="font-bold whitespace-pre-line">{doc.nguoiKy}</p>
                    </div>
                </div>
            </div>

            {/* Floating TOC & Actions */}
            <div className={`shrink-0 transition-all duration-300 ${tocOpen ? 'w-56' : 'w-10'}`}>
                <div className="sticky top-6 flex flex-col gap-4">
                    {/* Utility block */}
                    <div className={`bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col shrink-0`}>
                        <div className="bg-[#1a3b8b] text-white px-3 py-2 flex items-center justify-between shrink-0">
                            {tocOpen && <span className="text-[12px] font-semibold">Tiện ích</span>}
                            <button onClick={() => setUtilsOpen(s => !s)} className="text-white/80 hover:text-white ml-auto transition-transform" style={{ transform: utilsOpen ? 'rotate(0deg)' : 'rotate(180deg)' }}>
                                <ChevronDown size={16} />
                            </button>
                        </div>
                        {tocOpen && utilsOpen && (
                            <div className="p-3 animate-fade-in shrink-0 relative">
                                <div className="grid grid-cols-3 gap-y-4 gap-x-1">
                                    {[
                                        { icon: BookmarkPlus, label: 'Lưu trữ', onClick: () => setShowCollectionModal(true) },
                                        { icon: FileEdit, label: 'Ghi chú', onClick: () => setShowNoteModal(true) },
                                        { icon: MessageCircle, label: 'Kiến nghị', onClick: () => window.open(`/phan-anh-kien-nghi/tao-moi?vanban=${encodeURIComponent((doc?.soHieu ? doc.soHieu + ' - ' : '') + (doc?.title || ''))}`, '_blank') },
                                        { icon: MessageSquarePlus, label: 'Tạo chủ đề', onClick: () => window.open(`/dien-dan/tao-moi?title=${encodeURIComponent('Thảo luận về ' + (doc?.title || ''))}`, '_blank') },
                                        {
                                            icon: Mail, label: 'Email', onClick: () => {
                                                setEmailData({
                                                    to: '',
                                                    subject: doc?.title || 'Chia sẻ văn bản quy phạm pháp luật',
                                                    content: `Bạn được chia sẻ văn bản: ${doc?.title || ''}\n\nXem chi tiết tại: ${window.location.href}`
                                                });
                                                setShowEmailModal(true);
                                            }
                                        },
                                        { icon: Printer, label: 'In', onClick: () => window.print() }
                                    ].map((btn, idx) => (
                                        <div key={idx} className="group flex flex-col items-center gap-1.5 cursor-pointer" title={btn.label} onClick={btn.onClick}>
                                            <div className="w-10 h-10 rounded-xl bg-gradient-to-b from-blue-50 to-white flex items-center justify-center shadow-sm border border-blue-100 text-[#1a56db] group-hover:shadow group-hover:-translate-y-0.5 group-hover:from-[#1a56db] group-hover:to-[#1e3a8a] group-hover:text-white transition-all">
                                                <btn.icon size={18} strokeWidth={1.5} />
                                            </div>
                                            <span className="text-[11px] text-gray-700 font-medium group-hover:text-blue-600 transition-colors">{btn.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className={`bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col flex-1`}>
                        <div className="bg-[#1a3b8b] text-white px-3 py-2 flex items-center justify-between shrink-0">
                            {tocOpen && <span className="text-[12px] font-semibold">Mục lục</span>}
                            <button onClick={() => setTocOpen(s => !s)} className="text-white/80 hover:text-white ml-auto">
                                <List size={16} />
                            </button>
                        </div>
                        {tocOpen && (
                            <div className="p-2 space-y-0.5 max-h-[70vh] overflow-y-auto">
                                {tocItems.map(item => {
                                    const isChuong = item.type === 'chuong';
                                    return (
                                        <a key={item.id}
                                            href={`#${item.id}`}
                                            onClick={() => handleTocClick(item.id)}
                                            draggable="true"
                                            onDragStart={(e) => {
                                                e.dataTransfer.setData('application/json', JSON.stringify({
                                                    id: item.id,
                                                    label: isChuong ? `${item.label} - ${item.text}` : item.label
                                                }));
                                            }}
                                            className={`block text-[12px] px-2 py-1.5 rounded transition-colors leading-snug cursor-grab active:cursor-grabbing ${activeToc === item.id ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-gray-600 hover:bg-gray-50'}
                                            ${item.type === 'khoan' ? 'pl-4 text-gray-500 text-[11px]' : ''}
                                            ${isChuong ? 'text-left font-bold text-gray-800 uppercase mt-2' : ''}`}>
                                            {isChuong ? `${item.label} - ${item.text}` : item.label}
                                        </a>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Collecton Modal */}
            {showCollectionModal && (
                <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl overflow-hidden w-[450px] shadow-2xl flex flex-col animate-fade-in border border-gray-100">
                        <div className="bg-gradient-to-r from-[#1a3b8b] to-blue-600 text-white px-5 py-4 flex items-center justify-between">
                            <h3 className="font-bold text-[16px] flex items-center gap-2">
                                <BookmarkPlus size={18} /> Lưu vào Bộ sưu tập
                            </h3>
                            <button onClick={() => { setShowCollectionModal(false); setSaveSuccess(''); }} className="text-white/80 hover:text-white transition-colors bg-white/10 hover:bg-white/20 p-1.5 rounded-lg">
                                <X size={18} />
                            </button>
                        </div>
                        <div className="p-5 flex flex-col gap-4">
                            {saveSuccess ? (
                                <div className="bg-green-50 text-green-700 p-4 rounded-xl border border-green-200 flex flex-col items-center justify-center gap-2 text-center">
                                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-1">
                                        <Check size={24} className="text-green-600" />
                                    </div>
                                    <p className="font-semibold text-[15px]">{saveSuccess}</p>
                                    <p className="text-[13px] opacity-80">Bạn có thể xem lại văn bản tại Khu vực cá nhân.</p>
                                    <button onClick={() => { setShowCollectionModal(false); setSaveSuccess(''); }} className="mt-2 px-4 py-1.5 bg-green-600 text-white rounded-lg text-[13px] font-medium hover:bg-green-700 transition">Đóng</button>
                                </div>
                            ) : (
                                <>
                                    <div className="space-y-3 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
                                        {collections.map(col => (
                                            <label key={col.id} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${selectedCollection === col.id ? 'border-blue-500 bg-blue-50/50 shadow-sm' : 'border-gray-200 hover:border-gray-300'}`}>
                                                <input type="radio" name="collection" className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 shrink-0" checked={selectedCollection === col.id} onChange={() => setSelectedCollection(col.id)} />
                                                <div className="w-10 h-10 shrink-0 rounded-lg bg-indigo-100 overflow-hidden border border-indigo-200 flex items-center justify-center">
                                                    {col.image ? <img src={col.image} alt="" className="w-full h-full object-cover" /> : <Folder size={20} className="text-indigo-500 opacity-80" />}
                                                </div>
                                                <div className="flex flex-col flex-1 min-w-0">
                                                    <span className="font-bold text-gray-800 text-[14px] truncate">{col.name}</span>
                                                    <span className="text-[12px] text-gray-500 font-medium">{col.docs ? col.docs.length : 0} văn bản</span>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                    <div className="pt-3 border-t border-gray-100 flex gap-2">
                                        <input type="text" placeholder="Tên bộ sưu tập mới..." value={newCollectionName} onChange={e => setNewCollectionName(e.target.value)} className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-[13px] outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                                        <button
                                            onClick={() => {
                                                if (newCollectionName.trim()) {
                                                    if (window.confirm(`Bạn có chắc chắn muốn tạo Bộ sưu tập mới tên là "${newCollectionName.trim()}"?`)) {
                                                        const newCol = { id: Date.now(), name: newCollectionName.trim(), docs: [] };
                                                        const updated = [...collections, newCol];
                                                        setCollections(updated);
                                                        localStorage.setItem('cplqg_collections', JSON.stringify(updated));
                                                        setSelectedCollection(newCol.id);
                                                        setNewCollectionName('');
                                                        alert("Tạo bộ sưu tập thành công!");
                                                    }
                                                }
                                            }}
                                            disabled={!newCollectionName.trim()}
                                            className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-[13px] font-bold hover:bg-gray-200 disabled:opacity-50 transition flex items-center gap-1"
                                        >
                                            <Plus size={16} /> Thêm
                                        </button>
                                    </div>
                                    <div className="flex justify-end gap-2 pt-2">
                                        <button onClick={() => setShowCollectionModal(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-[13px] font-medium text-gray-700 hover:bg-gray-50 transition">Huỷ</button>
                                        <button
                                            onClick={() => {
                                                const updated = collections.map(c => {
                                                    if (c.id === selectedCollection) {
                                                        const exists = (c.docs || []).find(d => d.id === doc.id);
                                                        return exists ? c : { ...c, docs: [...(c.docs || []), { id: doc.id, title: doc.title, loai: doc.loai }] };
                                                    }
                                                    return c;
                                                });
                                                setCollections(updated);
                                                localStorage.setItem('cplqg_collections', JSON.stringify(updated));
                                                setSaveSuccess('Lưu văn bản thành công!');
                                            }}
                                            className="px-5 py-2 bg-[#1a3b8b] text-white rounded-lg text-[13px] font-medium hover:bg-blue-800 transition"
                                        >
                                            Lưu lại
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Floating Note Window */}
            {showNoteModal && (
                <div
                    className="fixed z-[100] bg-white rounded-2xl shadow-2xl flex flex-col animate-fade-in border border-gray-300 resize overflow-auto"
                    style={{
                        left: `${notePos.x}px`,
                        top: `${notePos.y}px`,
                        width: '650px',
                        height: '530px',
                        minWidth: '400px',
                        minHeight: '300px',
                        maxHeight: '90vh',
                        maxWidth: '90vw'
                    }}
                >
                    <div className="absolute right-[2px] bottom-[2px] pointer-events-none text-gray-400 z-50">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15L15 21M21 8L8 21" /></svg>
                    </div>
                    <div
                        className="bg-gradient-to-r from-[#1a3b8b] to-blue-600 text-white px-5 py-4 flex items-center justify-between cursor-move shrink-0 transition-opacity hover:opacity-95"
                        onPointerDown={handleHeaderPointerDown}
                        onPointerMove={handleHeaderPointerMove}
                        onPointerUp={handleHeaderPointerUp}
                        onPointerCancel={handleHeaderPointerUp}
                        title="Kéo & thả để di chuyển hộp thoại"
                    >
                        <h3 className="font-bold text-[16px] flex items-center gap-2 select-none">
                            <FileEdit size={18} /> Ghi chú văn bản
                        </h3>
                        <button
                            onPointerDown={e => e.stopPropagation()}
                            onClick={() => setShowNoteModal(false)}
                            className="text-white/80 hover:text-white transition-colors bg-white/10 hover:bg-white/20 p-1.5 rounded-lg z-10"
                            title="Đóng ghi chú"
                        >
                            <X size={18} />
                        </button>
                    </div>
                    <div className="p-5 flex flex-col gap-4 flex-1 overflow-hidden">
                        <div className="bg-blue-50/50 border border-blue-100 p-3 rounded-xl flex gap-3 items-start text-[13px] text-blue-800 shrink-0">
                            <Info size={16} className="shrink-0 mt-0.5" />
                            <p>Bạn có thể <strong>kéo thả các thẻ trên Mục lục bên tay phải</strong> vào vị trí bất kỳ trong văn bản ghi chú. Sau khi lưu, nhấp vào thẻ mục lục trong ghi chú sẽ đưa bạn đến đúng vị trí nội dung.</p>
                        </div>

                        <div className="flex-1 relative border border-gray-300 rounded-xl overflow-hidden focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all min-h-[100px]">
                            <style>{`
                                    .note-editor[contenteditable]:empty::before,
                                    .note-editor[contenteditable] > br:only-child::before {
                                        content: attr(data-placeholder);
                                        color: #9ca3af;
                                        pointer-events: none;
                                        display: block;
                                        font-style: italic;
                                    }
                                `}</style>
                            <div
                                ref={editorRef}
                                contentEditable={true}
                                className="note-editor w-full h-full p-4 outline-none text-[14px] leading-relaxed text-gray-800 overflow-y-auto min-h-[100px]"
                                data-placeholder="Nhập ghi chú hoặc kéo thả thẻ Mục lục vào đây..."
                                onInput={(e) => {
                                    const sel = window.getSelection();
                                    if (sel.rangeCount > 0) lastEditorRange.current = sel.getRangeAt(0).cloneRange();
                                }}
                                onMouseUp={(e) => {
                                    const sel = window.getSelection();
                                    if (sel.rangeCount > 0) lastEditorRange.current = sel.getRangeAt(0).cloneRange();
                                }}
                                onKeyUp={(e) => {
                                    const sel = window.getSelection();
                                    if (sel.rangeCount > 0) lastEditorRange.current = sel.getRangeAt(0).cloneRange();
                                }}
                                onClick={(e) => {
                                    const badge = e.target.closest('.toc-badge');
                                    if (badge) {
                                        const id = badge.getAttribute('data-toc-id');
                                        setTimeout(() => handleTocClick(id), 150);
                                    }
                                }}
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={(e) => {
                                    e.preventDefault();
                                    const dataStr = e.dataTransfer.getData('application/json');
                                    if (!dataStr) return;

                                    try {
                                        const data = JSON.parse(dataStr);
                                        const badgeHtml = `<span class="toc-badge text-[#1a3b8b] bg-blue-100/80 border border-blue-200 rounded px-2 py-0.5 mx-1 cursor-pointer font-semibold shadow-sm text-[12px] inline-flex items-center align-baseline gap-1 hover:bg-blue-200 transition-colors" data-toc-id="${data.id}" contentEditable="false">🔖 ${data.label}</span>&nbsp;`;

                                        if (window.getSelection) {
                                            const sel = window.getSelection();
                                            if (sel.getRangeAt && sel.rangeCount) {
                                                let range = sel.getRangeAt(0);

                                                if (editorRef.current && editorRef.current.contains(range.commonAncestorContainer)) {
                                                    range.deleteContents();
                                                    const el = document.createElement('div');
                                                    el.innerHTML = badgeHtml;
                                                    const frag = document.createDocumentFragment();
                                                    let node, lastNode;
                                                    while ((node = el.firstChild)) {
                                                        lastNode = frag.appendChild(node);
                                                    }
                                                    range.insertNode(frag);
                                                    if (lastNode) {
                                                        range = range.cloneRange();
                                                        range.setStartAfter(lastNode);
                                                        range.collapse(true);
                                                        sel.removeAllRanges();
                                                        sel.addRange(range);
                                                    }
                                                } else {
                                                    editorRef.current.innerHTML += badgeHtml;
                                                }
                                            }
                                        }
                                        localStorage.setItem(`cplqg_note_${doc?.id}`, editorRef.current.innerHTML);
                                    } catch (err) {
                                        console.error(err);
                                    }
                                }}
                            />
                        </div>

                        <div className="flex justify-between items-center pt-2 gap-4 shrink-0">
                            <span className="text-[12px] text-gray-500 leading-tight">Ghi chú tự động lưu xuống thiết bị.<br />Bạn có thể kéo thả mục lục hoặc bôi đen chữ trên màn hình.</span>
                            <div className="flex gap-2 shrink-0 items-center">
                                {noteSaveSuccess && <span className="text-[13px] font-bold text-green-600 animate-fade-in flex items-center gap-1 -ml-2 mr-1"><Check size={16} /> Đã lưu</span>}
                                <button onClick={() => setShowNoteModal(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-[13px] font-medium text-gray-700 hover:bg-gray-50 transition">Đóng</button>
                                <button
                                    onClick={() => {
                                        if (editorRef.current) {
                                            localStorage.setItem(`cplqg_note_${doc?.id}`, editorRef.current.innerHTML);
                                            setNoteSaveSuccess(true);
                                            setTimeout(() => {
                                                setNoteSaveSuccess(false);
                                                setShowNoteModal(false);
                                            }, 1000);
                                        }
                                    }}
                                    className="px-5 py-2 bg-[#1a3b8b] text-white rounded-lg text-[13px] font-bold hover:bg-blue-800 transition"
                                >
                                    Lưu Ghi chú
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Text Selection Popup */}
            {selectedTextPopup && showNoteModal && (
                <div
                    className="fixed z-[110] bg-[#1a3b8b] text-white text-[12px] font-bold px-3 py-1.5 rounded shadow-lg cursor-pointer hover:bg-blue-800 transition-colors animate-fade-in flex items-center gap-1.5"
                    style={{
                        left: `${selectedTextPopup.x}px`,
                        top: `${selectedTextPopup.y}px`,
                        transform: 'translate(-50%, -100%)'
                    }}
                    onMouseDown={(e) => {
                        e.preventDefault();
                    }}
                    onClick={() => {
                        const htmlToInsert = `<span class="bg-yellow-100/50 text-blue-800 px-1 rounded inline italic border-b border-yellow-300">"${selectedTextPopup.text}"</span>&nbsp;`;

                        if (lastEditorRange.current && editorRef.current) {
                            const sel = window.getSelection();
                            sel.removeAllRanges();
                            sel.addRange(lastEditorRange.current);

                            const range = lastEditorRange.current;
                            range.deleteContents();
                            const el = document.createElement('div');
                            el.innerHTML = htmlToInsert;
                            const frag = document.createDocumentFragment();
                            let node, lastNode;
                            while ((node = el.firstChild)) {
                                lastNode = frag.appendChild(node);
                            }
                            range.insertNode(frag);
                            if (lastNode) {
                                range.setStartAfter(lastNode);
                                range.collapse(true);
                                sel.removeAllRanges();
                                sel.addRange(range);
                                lastEditorRange.current = range.cloneRange();
                            }
                        } else if (editorRef.current) {
                            editorRef.current.innerHTML += htmlToInsert;
                        }

                        if (editorRef.current) {
                            localStorage.setItem(`cplqg_note_${doc?.id}`, editorRef.current.innerHTML);
                        }
                        setSelectedTextPopup(null);
                        setNoteSaveSuccess(true);
                        setTimeout(() => setNoteSaveSuccess(false), 3000);
                    }}
                >
                    <Plus size={14} /> Thêm vào ghi chú
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-l-transparent border-t-[5px] border-t-[#1a3b8b] border-r-[5px] border-r-transparent"></div>
                </div>
            )}

            {/* Email Modal */}
            {showEmailModal && (
                <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl overflow-hidden w-[450px] shadow-2xl flex flex-col animate-fade-in border border-gray-100">
                        <div className="bg-gradient-to-r from-[#1a3b8b] to-blue-600 text-white px-5 py-4 flex items-center justify-between">
                            <h3 className="font-bold text-[16px] flex items-center gap-2">
                                <Mail size={18} /> Chia sẻ qua Email
                            </h3>
                            <button onClick={() => setShowEmailModal(false)} className="text-white/80 hover:text-white transition-colors bg-white/10 hover:bg-white/20 p-1.5 rounded-lg">
                                <X size={18} />
                            </button>
                        </div>
                        <div className="p-5 flex flex-col gap-4">
                            <div>
                                <label className="block text-gray-800 text-[13px] font-medium mb-1.5">Email người nhận:</label>
                                <input
                                    type="email"
                                    value={emailData.to}
                                    onChange={(e) => setEmailData({ ...emailData, to: e.target.value })}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-[13px] outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-800 text-[13px] font-medium mb-1.5">Tiêu đề Email:</label>
                                <input
                                    type="text"
                                    value={emailData.subject}
                                    onChange={(e) => setEmailData({ ...emailData, subject: e.target.value })}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-[13px] outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-800 text-[13px] font-medium mb-1.5">Nội dung:</label>
                                <textarea
                                    value={emailData.content}
                                    onChange={(e) => setEmailData({ ...emailData, content: e.target.value })}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-[13px] outline-none h-32 leading-relaxed resize-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 custom-scrollbar"
                                />
                            </div>

                            <div className="flex justify-end gap-2 pt-2">
                                <button onClick={() => setShowEmailModal(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-[13px] font-medium text-gray-700 hover:bg-gray-50 transition">Huỷ</button>
                                <button onClick={() => {
                                    alert("Đã gửi email chia sẻ thành công!");
                                    setShowEmailModal(false);
                                }} className="px-5 py-2 bg-[#1a3b8b] text-white rounded-lg text-[13px] font-medium hover:bg-blue-800 transition">
                                    Gửi Email
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Popup Modal */}
            {modPopup && (
                <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl overflow-hidden w-[950px] max-w-full shadow-2xl flex flex-col max-h-[90vh] animate-fade-in border border-gray-100">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-[#1a3b8b] to-[#204bc2] px-6 py-4 flex justify-between items-center text-white shadow-md z-10">
                            <h3 className="font-bold text-[16px] uppercase tracking-wide flex items-center gap-2">
                                <Info size={18} className="text-blue-200" />
                                Các nội dung sửa đổi, hướng dẫn
                            </h3>
                            <button onClick={() => setModPopup(null)} className="hover:bg-white/20 p-1.5 text-white rounded-full transition-colors">
                                ✕
                            </button>
                        </div>

                        {/* Context bar */}
                        <div className="bg-gray-50 px-6 py-3.5 border-b border-gray-200 flex items-center gap-3">
                            <div className={`flex items-center justify-center w-5 h-5 rounded-full bg-white shadow-sm border ${MOD_COLORS[modPopup.type]?.replace('text-', 'border-') || 'border-gray-300'}`}>
                                <span className={`w-2 h-2 rounded-full ${MOD_COLORS[modPopup.type]?.replace('text-', 'bg-') || 'bg-gray-400'}`}></span>
                            </div>
                            <span className={`font-semibold text-[14px] ${MOD_COLORS[modPopup.type] || 'text-gray-700'}`}>
                                {modPopup.tooltipMessage}
                            </span>
                        </div>

                        {/* Columns */}
                        <div className="flex flex-col md:flex-row flex-1 overflow-auto bg-gray-50/50 p-6 gap-6">
                            {/* Left: Original */}
                            <div className="flex-1 bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col relative min-h-[350px] overflow-hidden group hover:border-gray-300 transition-colors">
                                <div className="bg-gray-50 text-gray-500 text-[13px] font-bold px-4 py-3 border-b border-gray-200 flex items-center gap-2 uppercase tracking-wide">
                                    <FileText size={15} />
                                    Nội dung gốc
                                </div>
                                <div className="p-5 text-[14.5px] text-justify leading-relaxed whitespace-pre-wrap text-gray-600">
                                    {modPopup.originalContent}
                                </div>
                            </div>

                            {/* Right: Modified */}
                            <div className="flex-1 bg-white border border-blue-100 rounded-xl shadow-sm flex flex-col relative min-h-[350px] overflow-hidden group hover:border-blue-300 transition-colors">
                                <div className="bg-blue-50/50 text-blue-800 text-[13px] font-bold px-4 py-3 border-b border-blue-100 flex items-center justify-between gap-2">
                                    <span className="flex items-center gap-2 uppercase tracking-wide">
                                        <Check size={16} />
                                        Nội dung sửa đổi, hướng dẫn
                                    </span>
                                    <span className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-1 rounded-full shrink-0 whitespace-nowrap">
                                        <ShieldCheck size={13} className="text-emerald-600" />
                                        Đã xác minh bởi CQLHQ - Bộ Tư Pháp
                                    </span>
                                </div>
                                <div className="p-5 text-[14.5px] text-justify leading-relaxed whitespace-pre-wrap text-gray-800">
                                    {modPopup.modifiedContent}
                                    <div className="mt-8 pt-4 border-t border-gray-100 flex justify-end">
                                        <Link to="/van-ban/5" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-blue-600 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg font-semibold text-[13px] transition-colors">
                                            Xem chi tiết nội dung văn bản <ChevronRight size={14} />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Expert Info */}
                        <div className="bg-white border-t border-gray-200 px-6 py-3 shrink-0 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <span className="text-sm font-medium text-gray-500">Cập nhật bởi:</span>
                                <Link to={`/cau-hoi-phap-luat/chuyen-gia/1`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 group bg-white border border-gray-200 px-3 py-1.5 rounded-lg shadow-sm hover:border-blue-300 hover:shadow-md transition-all">
                                    <img src="/images/officials/vietnamese_lawyer.png" alt="Expert Avatar" className="w-8 h-8 rounded-full object-cover border-2 border-gray-100 shadow-sm" />
                                    <div>
                                        <div className="text-[14px] font-bold text-gray-900 group-hover:text-blue-600 transition-colors leading-none mb-1">Luật sư Hoàng Ngọc Cường</div>
                                        <div className="text-[12px] text-gray-500 leading-none">Chuyên gia Thuế & Doanh nghiệp</div>
                                    </div>
                                </Link>
                            </div>
                            <div className="flex flex-col items-end gap-1 text-right">
                                <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg">
                                    <ShieldCheck size={14} className="text-emerald-600 shrink-0" />
                                    <span className="text-[12px] font-bold text-emerald-700">Nội dung đã xác minh</span>
                                </div>
                                <div className="text-[12px] text-gray-400 font-medium">Cổng pháp luật Quốc gia · 12/03/2026</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// ── Tab: Thuộc tính (UC47) ────────────────────────────────────────────────────
const TabThuocTinh = ({ doc }) => {
    const rows = [
        { label: 'Cơ quan ban hành', value: doc.cqBanHanh },
        { label: 'Số hiệu', value: doc.soHieu },
        { label: 'Loại văn bản', value: doc.loai },
        { label: 'Trích yếu', value: doc.trichYeu },
        { label: 'Ngày ban hành', value: doc.ngayBanHanh },
        { label: 'Số công báo', value: doc.soCongBao || null },
        { label: 'Ngày đăng công báo', value: doc.ngayCongBao || null },
        { label: 'Người ký', value: doc.nguoiKy },
        { label: 'Áp dụng', value: doc.apDung, isLink: doc.apDung === 'Đã biết' },
        { label: 'Ngày hết hiệu lực', value: doc.ngayHetHieuLuc || null },
        { label: 'Tình trạng hiệu lực', value: 'Còn Hiệu lực', isBadge: true, status: 'active' },
        { label: 'Lĩnh vực', value: doc.linhVuc, isList: true },
    ];

    return (
        <div className="bg-gray-50 rounded-xl border border-gray-100 overflow-hidden">
            <table className="w-full text-[13px]">
                <tbody>
                    {rows.map((row, i) => (
                        <tr key={row.label} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                            <td className="w-40 px-5 py-3 font-semibold text-gray-600 border-r border-gray-100 shrink-0">
                                {row.label}
                            </td>
                            <td className="px-5 py-3 text-gray-700">
                                {!row.value
                                    ? <span className="text-gray-400 italic text-[12px]">Đang cập nhật</span>
                                    : row.isBadge
                                        ? <span className={`inline-block px-2 py-0.5 rounded border text-[11px] font-semibold ${STATUS_MAP[row.status]?.cls}`}>{row.value}</span>
                                        : row.isLink
                                            ? <a href="#" className="text-blue-600 hover:underline">{row.value}</a>
                                            : row.isList
                                                ? (Array.isArray(row.value) ? row.value : [row.value]).map(v => (
                                                    <a key={v} href="#" className="inline-block mr-2 text-blue-600 hover:underline">{v}</a>
                                                ))
                                                : row.value
                                }
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

// ── Tab: Lược đồ (UC49) ───────────────────────────────────────────────────────
const LEFT_GROUPS = [
    { label: 'Văn bản được hướng dẫn', items: ['Thông tư 12/2025/TT-BYT'] },
    { label: 'Văn bản được hợp nhất', items: [] },
    { label: 'Văn bản bị sửa đổi bổ sung', items: ['Quyết định 123/QĐ-BYT', 'Quyết định 456/QĐ-BYT'] },
    { label: 'Văn bản bị đính chính', items: [] },
    { label: 'Văn bản bị thay thế', items: [] },
    { label: 'Văn bản được dẫn chiếu', items: ['Luật 89/2015/QH13'] },
    { label: 'Văn bản được căn cứ', items: ['Nghị định 95/2022/NĐ-CP'] },
];
const RIGHT_GROUPS = [
    { label: 'Văn bản hướng dẫn', items: [] },
    { label: 'Văn bản hợp nhất', items: [] },
    { label: 'Văn bản sửa đổi bổ sung', items: ['Quyết định 789/QĐ-BYT'] },
    { label: 'Văn bản đính chính', items: [] },
    { label: 'Văn bản thay thế', items: [] },
    { label: 'Văn bản liên quan cùng nội dung', items: ['Quyết định 100/QĐ-BYT', 'Thông tư 05/2026/TT-BYT'] },
];

const TabLuocDo = ({ doc }) => (
    <div className="grid grid-cols-3 gap-4 text-[12px]">
        {/* Left */}
        <div className="space-y-3">
            {LEFT_GROUPS.map(g => (
                <div key={g.label} className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                    <p className="font-semibold text-[11px] text-gray-500 uppercase tracking-wide mb-2">{g.label} ({g.items.length})</p>
                    {g.items.length > 0
                        ? g.items.map(item => <a key={item} href="#" className="flex items-start gap-1 text-blue-600 hover:underline mb-1"><span className="text-gray-400 mt-0.5">○</span>{item}</a>)
                        : <span className="text-gray-400 flex items-center gap-1"><span>○</span> --</span>
                    }
                </div>
            ))}
        </div>

        {/* Center */}
        <div className="flex items-start justify-center">
            <div className="bg-white border-2 border-[#1a3b8b] rounded-xl p-4 w-full shadow-sm">
                <p className="text-[10px] font-bold text-[#1a3b8b] uppercase tracking-widest mb-3 text-center">Văn bản đang xem</p>
                <div className="space-y-2">
                    {[
                        ['Số hiệu', <a href="#" className="text-blue-600 hover:underline">{doc.soHieu}</a>],
                        ['Ngành', doc.nganh],
                        ['Lĩnh vực', doc.linhVuc.join(', ')],
                        ['Cơ quan ban hành', <a href="#" className="text-blue-600 hover:underline">{doc.cqBanHanh}</a>],
                        ['Chức danh', doc.chucDanh],
                        ['Người ký', doc.nguoiKy],
                        ['Loại văn bản', doc.loai],
                        ['Ngày ban hành', doc.ngayBanHanh],
                        ['Ngày có hiệu lực', doc.ngayHieuLuc],
                        ['Ngày hết hiệu lực', doc.ngayHetHieuLuc || <span className="text-gray-400 italic">Đang cập nhật</span>],
                        ['Tình trạng', <span className="text-green-600 font-semibold">Còn Hiệu lực</span>],
                    ].map(([k, v]) => (
                        <div key={String(k)} className="flex gap-1.5 text-[11px] border-b border-gray-50 pb-1">
                            <span className="text-gray-500 shrink-0 w-28">{k}</span>
                            <span className="text-gray-800">{v}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* Right */}
        <div className="space-y-3">
            {RIGHT_GROUPS.map(g => (
                <div key={g.label} className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                    <p className="font-semibold text-[11px] text-gray-500 uppercase tracking-wide mb-2">{g.label} ({g.items.length})</p>
                    {g.items.length > 0
                        ? g.items.map(item => <a key={item} href="#" className="flex items-start gap-1 text-blue-600 hover:underline mb-1"><span className="text-gray-400 mt-0.5">○</span>{item}</a>)
                        : <span className="text-gray-400 flex items-center gap-1"><span>○</span> --</span>
                    }
                </div>
            ))}
        </div>
    </div>
);

// ── Tab: Văn bản gốc (UC46 MH03) ─────────────────────────────────────────────
const TabVanBanGoc = () => {
    const [page, setPage] = useState(1);
    const [zoom, setZoom] = useState(100);
    const TOTAL_PAGES = 12;
    return (
        <div className="border border-gray-200 rounded-xl overflow-hidden">
            {/* Toolbar */}
            <div className="bg-gray-100 border-b border-gray-200 px-4 py-2 flex items-center gap-2 flex-wrap">
                {/* Search */}
                <div className="relative">
                    <Search size={12} className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input className="pl-6 pr-3 py-1 text-[12px] border border-gray-300 rounded outline-none focus:border-blue-400 w-36" placeholder="Tìm trong tài liệu" />
                </div>
                <div className="w-px h-5 bg-gray-300 mx-1" />
                {/* Page nav */}
                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="w-7 h-7 flex items-center justify-center rounded border border-gray-300 bg-white disabled:opacity-40 hover:border-blue-400">◀</button>
                <span className="text-[12px] text-gray-600"><input value={page} onChange={e => setPage(+e.target.value || 1)} className="w-8 text-center border border-gray-300 rounded py-0.5 text-[12px]" /> / {TOTAL_PAGES}</span>
                <button onClick={() => setPage(p => Math.min(TOTAL_PAGES, p + 1))} disabled={page === TOTAL_PAGES} className="w-7 h-7 flex items-center justify-center rounded border border-gray-300 bg-white disabled:opacity-40 hover:border-blue-400">▶</button>
                <div className="w-px h-5 bg-gray-300 mx-1" />
                {/* Zoom */}
                <button onClick={() => setZoom(z => Math.max(50, z - 10))} className="w-7 h-7 flex items-center justify-center rounded border border-gray-300 bg-white hover:border-blue-400"><ZoomOut size={12} /></button>
                <select value={zoom} onChange={e => setZoom(+e.target.value)} className="border border-gray-300 rounded px-1 py-0.5 text-[12px] outline-none bg-white">
                    {[50, 75, 100, 125, 150, 200].map(v => <option key={v} value={v}>{v}%</option>)}
                </select>
                <button onClick={() => setZoom(z => Math.min(200, z + 10))} className="w-7 h-7 flex items-center justify-center rounded border border-gray-300 bg-white hover:border-blue-400"><ZoomIn size={12} /></button>
                <div className="w-px h-5 bg-gray-300 mx-1" />
                <button className="w-7 h-7 flex items-center justify-center rounded border border-gray-300 bg-white hover:border-blue-400"><RotateCw size={12} /></button>
                <button className="w-7 h-7 flex items-center justify-center rounded border border-gray-300 bg-white hover:border-blue-400"><Maximize2 size={12} /></button>
                <div className="ml-auto flex gap-2">
                    <button className="flex items-center gap-1 px-2 py-1 border border-gray-300 rounded text-[12px] bg-white hover:border-blue-400"><Printer size={12} /> In</button>
                    <button className="flex items-center gap-1 px-2 py-1 border border-gray-300 rounded text-[12px] bg-white hover:border-blue-400"><Download size={12} /> Tải về</button>
                </div>
            </div>
            {/* Viewer area */}
            <div className="bg-gray-200 flex items-center justify-center min-h-[500px] p-8">
                <div className="bg-white shadow-xl rounded p-12 text-center" style={{ width: `${zoom * 5}px`, maxWidth: '100%' }}>
                    <FileText size={48} className="mx-auto mb-4 text-gray-300" />
                    <p className="text-[14px] font-bold text-gray-600">Trang {page} / {TOTAL_PAGES}</p>
                    <p className="text-[12px] text-gray-400 mt-2">631/QĐ-BYT – Kế hoạch Phòng, chống bệnh truyền nhiễm năm 2026</p>
                    <p className="text-[11px] text-gray-300 mt-6">(Trình xem PDF – Bản demo)</p>
                </div>
            </div>
        </div>
    );
};

// ── Tab: Văn bản liên quan (UC48) ─────────────────────────────────────────────
const RELATED_GROUPS = [
    { key: 'all', label: 'Tất cả', count: 8 },
    { key: 'can-cu', label: 'Văn bản căn cứ', count: 8 },
    { key: 'sua-doi', label: 'Văn bản sửa đổi bổ sung', count: 0 },
    { key: 'thay-the', label: 'Văn bản thay thế', count: 0 },
];

const RELATED_LIST = [
    { id: 1, title: 'Luật Phòng, chống bệnh truyền nhiễm ngày 21 tháng 11 năm 2007', group: 'can-cu', ngayBanHanh: '21/11/2007', ngayApDung: '01/07/2008', status: 'active' },
    { id: 2, title: 'Nghị định số 95/2022/NĐ-CP ngày 15 tháng 11 năm 2022 của Chính phủ quy định chức năng, nhiệm vụ, quyền hạn và cơ cấu tổ chức của Bộ Y tế', group: 'can-cu', ngayBanHanh: '15/11/2022', ngayApDung: '01/01/2023', status: 'active' },
    { id: 3, title: 'Nghị quyết số 99/NQ-CP ngày 30 tháng 8 năm 2021 của Chính phủ', group: 'can-cu', ngayBanHanh: '30/08/2021', ngayApDung: '30/08/2021', status: 'active' },
    { id: 4, title: 'Quyết định số 376/QĐ-TTg ngày 17 tháng 3 năm 2021 của Thủ tướng Chính phủ', group: 'can-cu', ngayBanHanh: '17/03/2021', ngayApDung: '17/03/2021', status: 'active' },
    { id: 5, title: 'Thông tư số 54/2015/TT-BYT ngày 28 tháng 12 năm 2015 của Bộ Y tế', group: 'can-cu', ngayBanHanh: '28/12/2015', ngayApDung: '01/03/2016', status: 'expired' },
    { id: 6, title: 'Quyết định 1337/QĐ-BYT ngày 20 tháng 3 năm 2018 của Bộ Y tế', group: 'can-cu', ngayBanHanh: '20/03/2018', ngayApDung: '20/03/2018', status: 'active' },
    { id: 7, title: 'Kế hoạch phòng chống dịch bệnh mùa đông xuân 2025-2026', group: 'can-cu', ngayBanHanh: '10/10/2025', ngayApDung: '10/10/2025', status: 'active' },
    { id: 8, title: 'Hướng dẫn giám sát phòng chống bệnh truyền nhiễm 2024', group: 'can-cu', ngayBanHanh: '05/01/2024', ngayApDung: '05/01/2024', status: 'active' },
];

const TabVanBanLienQuan = ({ navigate }) => {
    const [activeGroup, setActiveGroup] = useState('all');
    const filtered = activeGroup === 'all' ? RELATED_LIST : RELATED_LIST.filter(d => d.group === activeGroup);
    return (
        <div>
            <p className="text-[13px] text-gray-500 italic mb-4">Danh sách các văn bản có liên quan đến văn bản hiện tại, bao gồm văn bản căn cứ, văn bản được sửa đổi, bổ sung...</p>
            <div className="flex gap-5">
                {/* Sidebar filter */}
                <div className="w-52 shrink-0">
                    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                        {RELATED_GROUPS.map(g => (
                            <button key={g.key} onClick={() => setActiveGroup(g.key)}
                                className={`w-full text-left flex items-center justify-between px-4 py-3 text-[13px] border-b border-gray-100 last:border-b-0 transition-colors ${activeGroup === g.key ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-gray-700 hover:bg-gray-50'}`}>
                                <span>{g.label}</span>
                                <span className={`text-[11px] ${g.count === 0 ? 'text-gray-400' : 'text-blue-600 font-bold'}`}>({g.count})</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* List */}
                <div className="flex-1 min-w-0">
                    {filtered.length === 0 ? (
                        <p className="text-[13px] text-gray-400 italic py-8 text-center">Không có văn bản trong nhóm này.</p>
                    ) : (
                        <div className="space-y-4">
                            {filtered.map((doc, i) => {
                                const sb = STATUS_MAP[doc.status];
                                return (
                                    <div key={doc.id} className="flex gap-3 pb-4 border-b border-gray-100 last:border-b-0">
                                        <div className="w-7 h-7 rounded bg-[#1a3b8b] text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                                            {String(i + 1).padStart(2, '0')}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <a href="#" className="text-[14px] font-bold text-blue-700 hover:underline leading-snug block mb-1">{doc.title}</a>
                                            <span className="text-[11px] text-gray-500 italic">Văn bản căn cứ</span>
                                            <QuickBtns />
                                        </div>
                                        <div className="shrink-0 text-right text-[11px] text-gray-500 min-w-[120px] space-y-1 mt-0.5">
                                            <p><span className="text-gray-400">Ban hành:</span> {doc.ngayBanHanh}</p>
                                            <p><span className="text-gray-400">Áp dụng:</span> {doc.ngayApDung}</p>
                                            <span className={`inline-block px-2 py-0.5 rounded border text-[10px] font-semibold ${sb.cls}`}>{sb.label}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// ── Tab: Chủ đề thảo luận liên quan ──────────────────────────────────────────
const FORUM_TOPICS = [
    { id: 1, title: 'Thảo luận về những điểm mới của Thông tư 78/2014/TT-BTC', author: 'Nguyễn Văn A', replies: 15, views: 230, date: '10/05/2026' },
    { id: 2, title: 'Hỏi đáp các vướng mắc khi áp dụng quy định về Thuế thu nhập doanh nghiệp', author: 'Trần Thị B', replies: 8, views: 120, date: '05/05/2026' },
    { id: 3, title: 'Chia sẻ kinh nghiệm quyết toán thuế theo quy định mới', author: 'Lê Hoàng', replies: 32, views: 500, date: '01/05/2026' },
];

const TabChuDeThaoLuanLienQuan = ({ doc }) => (
    <div className="space-y-4">
        <div className="flex justify-between items-center mb-4">
            <p className="text-[13px] text-gray-500 italic">Các chủ đề thảo luận trên diễn đàn liên quan đến văn bản pháp luật này.</p>
            <button 
                onClick={() => window.open(`/dien-dan/tao-moi?title=${encodeURIComponent('Thảo luận về ' + (doc?.title || ''))}`, '_blank')}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#1a3b8b] text-white rounded hover:bg-blue-800 transition-colors text-[13px] font-semibold shrink-0"
            >
                <Plus size={14} /> Tạo chủ đề mới
            </button>
        </div>
        <div className="grid gap-3">
            {FORUM_TOPICS.map(topic => (
                <Link to={'/dien-dan/bai-viet/' + topic.id} key={topic.id} className="flex gap-4 p-4 border border-gray-200 rounded-xl bg-white hover:border-blue-300 transition-colors shadow-sm group cursor-pointer">
                    <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0 text-blue-600 group-hover:bg-blue-100 transition-colors">
                        <MessageSquarePlus size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                        <span className="text-[15px] font-bold text-gray-800 group-hover:text-blue-600 group-hover:underline leading-snug line-clamp-1 mb-1">{topic.title}</span>
                        <div className="flex flex-wrap items-center gap-4 text-[12px] text-gray-500">
                            <span className="flex items-center gap-1"><User size={12}/> {topic.author}</span>
                            <span className="flex items-center gap-1"><Clock size={12}/> {topic.date}</span>
                            <span className="flex items-center gap-1"><MessageCircle size={12}/> {topic.replies} phản hồi</span>
                            <span className="flex items-center gap-1"><Eye size={12}/> {topic.views} lượt xem</span>
                        </div>
                    </div>
                    <div className="shrink-0 flex items-center">
                        <span className="text-[13px] font-semibold text-[#1a3b8b] group-hover:underline">Xem chi tiết &rarr;</span>
                    </div>
                </Link>
            ))}
        </div>
    </div>
);

// ── Tab: Tải về (UC50) ────────────────────────────────────────────────────────
const FILES = [
    { id: 1, name: 'Quyết định 631/QĐ-BYT của Bộ Y tế ban hành Kế hoạch Phòng, chống bệnh truyền nhiễm năm 2026', type: 'Văn bản gốc', lang: 'Tiếng Việt', ext: 'PDF' },
    { id: 2, name: 'Phụ lục 01 – Kế hoạch phòng chống bệnh sốt xuất huyết Dengue 2026', type: 'Phụ lục', lang: 'Tiếng Việt', ext: 'DOCX' },
    { id: 3, name: 'Phụ lục 02 – Kế hoạch kiểm soát cúm mùa và cúm A 2026', type: 'Phụ lục', lang: 'Tiếng Việt', ext: 'PDF' },
];

const TabTaiVe = () => (
    <div className="space-y-3">
        {FILES.map(f => (
            <div key={f.id} className="flex items-center gap-4 bg-white border border-gray-200 rounded-xl p-4 hover:border-blue-200 transition-colors">
                {/* Icon */}
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-[11px] shrink-0 ${f.ext === 'PDF' ? 'bg-red-500' : 'bg-blue-600'}`}>
                    {f.ext}
                </div>
                {/* Info */}
                <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-bold text-gray-800 line-clamp-2">{f.name}</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">{f.type} · {f.lang}</p>
                </div>
                {/* Download */}
                <a href="#" download
                    className="shrink-0 flex items-center gap-1.5 px-4 py-2 border border-blue-400 text-blue-600 rounded-lg text-[12px] font-semibold hover:bg-blue-50 transition-colors">
                    ↑ Tải về
                </a>
            </div>
        ))}
    </div>
);

// ── Main Page ─────────────────────────────────────────────────────────────────
const VanBanDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('noi-dung');
    const [copied, setCopied] = useState(false);
    const [tocOpen, setTocOpen] = useState(true);
    const [showLegend, setShowLegend] = useState(false);

    const doc = getMockDoc(id); // Fetch by id
    const sb = STATUS_MAP[doc.status];

    const handleCopySoHieu = () => {
        navigator.clipboard.writeText(doc.soHieu).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <div className="bg-[#f4f7fb] min-h-screen pb-16">
            <div className="container mx-auto px-4 max-w-[1280px] pt-5">
                {/* Breadcrumb */}
                <nav className="flex items-center flex-wrap gap-1 text-[12px] text-gray-500 mb-4">

                    <span className="cursor-pointer hover:text-blue-600">Văn bản pháp luật</span>
                    <ChevronRight size={12} />
                    <Link to="/van-ban/tim-kiem" className="hover:text-blue-600">Hệ thống VBQPPL</Link>
                    <ChevronRight size={12} />
                    <span className="text-gray-800 font-medium line-clamp-1 max-w-[320px]">{doc.soHieu}</span>
                </nav>

                {/* Back */}
                <button onClick={() => navigate(-1)}
                    className="flex items-center gap-1.5 text-[13px] text-blue-600 hover:text-blue-800 mb-5 transition-colors">
                    <ArrowLeft size={15} /> Quay lại danh sách
                </button>

                {/* ── Header card ── */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 mb-0">
                    <h1 className="text-[20px] font-bold text-[#0f4c81] leading-snug mb-3">{doc.title}</h1>

                    <div className="flex flex-wrap items-center gap-3 text-[12px] mb-3">
                        {/* Số hiệu – copy */}
                        <button onClick={handleCopySoHieu}
                            className="flex items-center gap-1.5 text-blue-600 hover:text-blue-800 transition-colors font-semibold">
                            {doc.soHieu}
                            {copied ? <Check size={13} className="text-green-500" /> : <Copy size={13} />}
                            {copied && <span className="text-green-500 text-[11px] font-normal">Đã sao chép</span>}
                        </button>

                        {/* Badge */}
                        <span className={`inline-block px-2.5 py-0.5 rounded border text-[11px] font-semibold ${sb.cls}`}>{sb.label}</span>

                        {/* Badge "Đã kiểm tra" */}
                        <span className="inline-block px-2.5 py-0.5 rounded border border-blue-200 text-[11px] font-semibold bg-blue-50 text-blue-700">
                            ✓ Đã kiểm tra
                        </span>
                    </div>

                    <div className="flex flex-wrap gap-4 text-[12px] text-gray-500">
                        <span>Ngày có hiệu lực: <strong className="text-gray-700">{doc.ngayHieuLuc}</strong></span>
                        <span>Ngày cập nhật: <strong className="text-gray-700">{doc.ngayCapNhat}</strong></span>
                    </div>

                    {/* Tab bar */}
                    <div className="flex gap-0 mt-5 border-b border-gray-200 -mx-5 px-5 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
                        {TABS.map(tab => {
                            const Icon = tab.icon;
                            return (
                                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-1.5 px-4 py-2.5 text-[13px] font-semibold border-b-2 -mb-px transition-colors whitespace-nowrap ${activeTab === tab.id ? 'border-blue-600 text-blue-700' : 'border-transparent text-gray-500 hover:text-blue-600'}`}>
                                    <Icon size={14} />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* ── Tab content ── */}
                <div className="bg-white rounded-b-xl border border-t-0 border-gray-100 shadow-sm p-5">
                    {activeTab === 'noi-dung' && <TabNoiDung doc={doc} tocOpen={tocOpen} setTocOpen={setTocOpen} />}
                    {activeTab === 'thuoc-tinh' && <TabThuocTinh doc={doc} />}
                    {activeTab === 'luoc-do' && <TabLuocDo doc={doc} />}
                    {activeTab === 'van-ban-goc' && <TabVanBanGoc />}
                    {activeTab === 'van-ban-lq' && <TabVanBanLienQuan navigate={navigate} />}
                    {activeTab === 'tai-ve' && <TabTaiVe />}
                    {activeTab === 'chu-de-lq' && <TabChuDeThaoLuanLienQuan doc={doc} />}
                </div>
            </div>

            {/* Floating Legend Button */}
            <div className="fixed bottom-6 left-6 z-40">
                {showLegend && (
                    <div className="absolute bottom-full left-0 mb-4 w-[320px] bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 animate-fade-in overflow-hidden">
                        <div className="flex justify-between items-center bg-gray-50/80 p-4 border-b border-gray-100">
                            <h3 className="font-bold text-gray-800 text-[13px] uppercase tracking-wide">Trạng thái văn bản</h3>
                            <button onClick={() => setShowLegend(false)} className="text-gray-400 hover:text-gray-800 transition-colors font-medium">✕</button>
                        </div>
                        <div className="p-4">
                            <ul className="space-y-3.5 text-[14px] text-gray-700 mb-4">
                                <li className="flex items-center gap-3">
                                    <span className="w-3 h-3 rounded-full bg-[#ef4444] shadow-sm"></span>
                                    <span className="font-medium text-[#ef4444]">Sửa đổi, thay thế, hủy bỏ</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="w-3 h-3 rounded-full bg-[#a855f7] shadow-sm"></span>
                                    <span className="font-medium text-[#a855f7]">Bổ sung</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="w-3 h-3 rounded-full bg-[#14b8a6] shadow-sm"></span>
                                    <span className="font-medium text-[#14b8a6]">Đính chính</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="w-3 h-3 rounded-full bg-[#ec4899] shadow-sm"></span>
                                    <span className="font-medium text-[#ec4899]">Hướng dẫn</span>
                                </li>
                            </ul>
                            <div className="text-[13px] text-gray-600 bg-blue-50/50 p-3 rounded-xl border border-blue-100/50">
                                Click vào phần <span className="bg-[#c9e6ff] px-1.5 py-0.5 rounded text-gray-800 font-medium">bôi xanh</span> để xem chi tiết.
                            </div>
                        </div>
                    </div>
                )}

                <button
                    onClick={() => setShowLegend(!showLegend)}
                    className="flex items-center gap-2 bg-gradient-to-r from-[#1a3b8b] to-[#204bc2] text-white px-5 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all font-semibold text-[13px] border border-white/20"
                >
                    <Info size={18} />
                    Chú thích trạng thái
                </button>
            </div>

        </div>
    );
};

export default VanBanDetailPage;

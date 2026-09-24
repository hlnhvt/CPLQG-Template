import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
    Search,
    ChevronLeft,
    ChevronRight,
    ChevronDown,
    ChevronUp,
    Download,
    FileText,
    CheckCircle2,
    Calendar,
    Clock,
    X,
    Filter,
    Building2,
    RotateCcw
} from 'lucide-react';
import HanoiHeader from '../../components/hanoi/HanoiHeader';
import HanoiFooter from '../../components/hanoi/HanoiFooter';

// ── Mock Legal Documents Data for Hanoi ───────────────────────────────────────
const HINH_THUC = [
    'Nghị quyết', 'Quyết định', 'Luật', 'Chỉ thị', 'Văn bản hợp nhất',
    'Thông tư', 'Quy chế', 'Quy định', 'Kế hoạch', 'Thông báo', 'Công văn'
];

const CO_QUAN = [
    'HĐND TP Hà Nội', 'UBND TP Hà Nội', 'Chủ tịch UBND TP',
    'Sở Tư pháp TP Hà Nội', 'Quốc hội', 'Chính phủ'
];

const LINH_VUC = [
    'Đất đai - Đô thị', 'Quy hoạch - Xây dựng', 'Tài chính - Ngân sách',
    'Tư pháp - Thể chế', 'Cải cách hành chính', 'Môi trường - Giao thông',
    'Khoa học công nghệ & ĐMST', 'Y tế - Giáo dục'
];

const HANOI_DISTRICTS = [
    "Quận Ba Đình", "Quận Hoàn Kiếm", "Quận Tây Hồ", "Quận Long Biên",
    "Quận Cầu Giấy", "Quận Đống Đa", "Quận Hai Bà Trưng", "Quận Hoàng Mai",
    "Quận Thanh Xuân", "Quận Hà Đông", "Quận Bắc Từ Liêm", "Quận Nam Từ Liêm",
    "Thị xã Sơn Tây", "Huyện Đông Anh", "Huyện Gia Lâm", "Huyện Sóc Sơn",
    "Huyện Thanh Trì", "Huyện Mê Linh", "Huyện Đan Phượng", "Huyện Hoài Đức"
];

const HANOI_DOCUMENTS = [
    {
        id: 1,
        soHieu: '39/2024/QH15',
        title: 'Luật Thủ đô số 39/2024/QH15 của Quốc hội khóa XV ban hành ngày 28/06/2024',
        loai: 'Luật',
        linh_vuc: 'Tư pháp - Thể chế',
        co_quan: 'Quốc hội',
        ngay_ban_hanh: '28/06/2024',
        ngay_ap_dung: '01/01/2025',
        status: 'active',
        nhom: 'phap_quy'
    },
    {
        id: 2,
        soHieu: '05/2026/NQ-HĐND',
        title: 'Nghị quyết về cơ chế hỗ trợ tài chính và ưu đãi đầu tư đối với doanh nghiệp khởi nghiệp đổi mới sáng tạo trên địa bàn Thành phố Hà Nội giai đoạn 2026 - 2030',
        loai: 'Nghị quyết',
        linh_vuc: 'Khoa học công nghệ & ĐMST',
        co_quan: 'HĐND TP Hà Nội',
        ngay_ban_hanh: '15/02/2026',
        ngay_ap_dung: '01/03/2026',
        status: 'active',
        nhom: 'phap_quy'
    },
    {
        id: 3,
        soHieu: '61/2024/QĐ-UBND',
        title: 'Quyết định quy định về bồi thường, hỗ trợ, tái định cư khi Nhà nước thu hồi đất áp dụng trên địa bàn thành phố Hà Nội theo Luật Đất đai 2024',
        loai: 'Quyết định',
        linh_vuc: 'Đất đai - Đô thị',
        co_quan: 'UBND TP Hà Nội',
        ngay_ban_hanh: '27/09/2024',
        ngay_ap_dung: '07/10/2024',
        status: 'active',
        nhom: 'phap_quy'
    },
    {
        id: 4,
        soHieu: '16/2024/NQ-HĐND',
        title: 'Nghị quyết quy định biện pháp yêu cầu ngừng cung cấp dịch vụ điện, nước đối với công trình vi phạm trật tự xây dựng trên địa bàn Hà Nội',
        loai: 'Nghị quyết',
        linh_vuc: 'Quy hoạch - Xây dựng',
        co_quan: 'HĐND TP Hà Nội',
        ngay_ban_hanh: '04/10/2024',
        ngay_ap_dung: '01/01/2025',
        status: 'active',
        nhom: 'phap_quy'
    },
    {
        id: 5,
        soHieu: '18/2025/QĐ-UBND',
        title: 'Quyết định ban hành Quy chế tiếp nhận, xử lý phản ánh kiến nghị của cá nhân, tổ chức trên nền tảng ứng dụng Công dân Thủ đô số (iHanoi)',
        loai: 'Quyết định',
        linh_vuc: 'Cải cách hành chính',
        co_quan: 'UBND TP Hà Nội',
        ngay_ban_hanh: '22/11/2025',
        ngay_ap_dung: '05/12/2025',
        status: 'active',
        nhom: 'phap_quy'
    },
    {
        id: 6,
        soHieu: '12/2025/NQ-HĐND',
        title: 'Nghị quyết quy định các tiêu chí phân vùng bảo vệ môi trường, lộ trình hạn chế khí thải phương tiện giao thông tại các quận vùng lõi lịch sử Thủ đô',
        loai: 'Nghị quyết',
        linh_vuc: 'Môi trường - Giao thông',
        co_quan: 'HĐND TP Hà Nội',
        ngay_ban_hanh: '10/07/2025',
        ngay_ap_dung: '01/08/2025',
        status: 'active',
        nhom: 'phap_quy'
    },
    {
        id: 7,
        soHieu: '72/2024/QĐ-UBND',
        title: 'Quyết định ban hành tiêu chuẩn, định mức sử dụng diện tích chuyên dùng phục vụ nhiệm vụ đặc thù của cơ quan, tổ chức Thủ đô',
        loai: 'Quyết định',
        linh_vuc: 'Tài chính - Ngân sách',
        co_quan: 'UBND TP Hà Nội',
        ngay_ban_hanh: '15/11/2024',
        ngay_ap_dung: '01/01/2025',
        status: 'active',
        nhom: 'phap_quy'
    },
    {
        id: 8,
        soHieu: '03/2026/CT-UBND',
        title: 'Chỉ thị về việc tăng cường công tác phổ biến, giáo dục pháp luật và nâng cao ý thức chấp hành pháp luật của cán bộ, công chức, viên chức Thủ đô năm 2026',
        loai: 'Chỉ thị',
        linh_vuc: 'Tư pháp - Thể chế',
        co_quan: 'UBND TP Hà Nội',
        ngay_ban_hanh: '18/01/2026',
        ngay_ap_dung: '18/01/2026',
        status: 'active',
        nhom: 'phap_quy'
    },
    {
        id: 9,
        soHieu: '11/2024/NQ-HĐND',
        title: 'Nghị quyết quy định chi tiết trình tự, thủ tục áp dụng biện pháp thử nghiệm có kiểm soát (Sandbox) theo Luật Thủ đô',
        loai: 'Nghị quyết',
        linh_vuc: 'Khoa học công nghệ & ĐMST',
        co_quan: 'HĐND TP Hà Nội',
        ngay_ban_hanh: '12/12/2024',
        ngay_ap_dung: '01/01/2025',
        status: 'active',
        nhom: 'phap_quy'
    },
    {
        id: 10,
        soHieu: '15/2024/NQ-HĐND',
        title: 'Nghị quyết về chính sách thu hút, trọng dụng nhân tài và phát triển nguồn nhân lực chất lượng cao của Thủ đô',
        loai: 'Nghị quyết',
        linh_vuc: 'Tư pháp - Thể chế',
        co_quan: 'HĐND TP Hà Nội',
        ngay_ban_hanh: '15/12/2024',
        ngay_ap_dung: '01/01/2025',
        status: 'active',
        nhom: 'phap_quy'
    },
    {
        id: 11,
        soHieu: '08/2025/QĐ-UBND',
        title: 'Quyết định ban hành Kế hoạch triển khai đồng bộ các chương trình thi hành Luật Thủ đô trên địa bàn 30 quận, huyện, thị xã',
        loai: 'Quyết định',
        linh_vuc: 'Tư pháp - Thể chế',
        co_quan: 'UBND TP Hà Nội',
        ngay_ban_hanh: '10/01/2025',
        ngay_ap_dung: '25/01/2025',
        status: 'active',
        nhom: 'phap_quy'
    },
    {
        id: 12,
        soHieu: '25/2023/NQ-HĐND',
        title: 'Nghị quyết quy định mức thu học phí đối với các cơ sở giáo dục mầm non, giáo dục phổ thông công lập trên địa bàn thành phố Hà Nội',
        loai: 'Nghị quyết',
        linh_vuc: 'Y tế - Giáo dục',
        co_quan: 'HĐND TP Hà Nội',
        ngay_ban_hanh: '04/07/2023',
        ngay_ap_dung: '15/07/2023',
        status: 'expired',
        nhom: 'phap_quy'
    },
    {
        id: 13,
        soHieu: '04/VBHN-UBND',
        title: 'Văn bản hợp nhất Quyết định ban hành Quy định về quản lý và bảo vệ môi trường trên địa bàn thành phố Hà Nội',
        loai: 'Văn bản hợp nhất',
        linh_vuc: 'Môi trường - Giao thông',
        co_quan: 'UBND TP Hà Nội',
        ngay_ban_hanh: '14/04/2024',
        ngay_ap_dung: '01/05/2024',
        status: 'active',
        nhom: 'hop_nhat'
    },
    {
        id: 14,
        soHieu: '09/2025/NQ-HĐND',
        title: 'Nghị quyết quy định chế độ hỗ trợ đặc thù đối với giám định viên tư pháp và người giám định tư pháp theo vụ việc tại Hà Nội',
        loai: 'Nghị quyết',
        linh_vuc: 'Tư pháp - Thể chế',
        co_quan: 'HĐND TP Hà Nội',
        ngay_ban_hanh: '18/06/2025',
        ngay_ap_dung: '01/07/2025',
        status: 'active',
        nhom: 'phap_quy'
    },
    {
        id: 15,
        soHieu: '32/2024/QĐ-UBND',
        title: 'Quyết định quy định thẩm quyền, trình tự thành lập, tổ chức lại, giải thể đơn vị sự nghiệp công lập thuộc UBND thành phố Hà Nội',
        loai: 'Quyết định',
        linh_vuc: 'Cải cách hành chính',
        co_quan: 'UBND TP Hà Nội',
        ngay_ban_hanh: '12/05/2024',
        ngay_ap_dung: '25/05/2024',
        status: 'active',
        nhom: 'phap_quy'
    },
    {
        id: 16,
        soHieu: '01/2026/QĐ-UBND',
        title: 'Quyết định ban hành Bảng giá các loại đất trên địa bàn thành phố Hà Nội áp dụng cho giai đoạn 2026 - 2030',
        loai: 'Quyết định',
        linh_vuc: 'Đất đai - Đô thị',
        co_quan: 'UBND TP Hà Nội',
        ngay_ban_hanh: '05/01/2026',
        ngay_ap_dung: '01/01/2027',
        status: 'pending',
        nhom: 'phap_quy'
    },
    {
        id: 17,
        soHieu: '14/2024/QĐ-UBND',
        title: 'Quyết định phân cấp quản lý nhà nước một số lĩnh vực hạ tầng, kinh tế - xã hội trên địa bàn thành phố Hà Nội',
        loai: 'Quyết định',
        linh_vuc: 'Tư pháp - Thể chế',
        co_quan: 'UBND TP Hà Nội',
        ngay_ban_hanh: '19/02/2024',
        ngay_ap_dung: '01/03/2024',
        status: 'active',
        nhom: 'phap_quy'
    },
    {
        id: 18,
        soHieu: '06/VBHN-UBND',
        title: 'Văn bản hợp nhất Quy định về an toàn phòng cháy và chữa cháy đối với nhà ở hộ gia đình và nhà ở kết hợp sản xuất kinh doanh tại Hà Nội',
        loai: 'Văn bản hợp nhất',
        linh_vuc: 'Quy hoạch - Xây dựng',
        co_quan: 'UBND TP Hà Nội',
        ngay_ban_hanh: '08/08/2024',
        ngay_ap_dung: '20/08/2024',
        status: 'active',
        nhom: 'hop_nhat'
    },
    {
        id: 19,
        soHieu: '21/2025/NQ-HĐND',
        title: 'Nghị quyết quy định chính sách hỗ trợ phát triển nông nghiệp công nghệ cao và bảo tồn làng nghề truyền thống Thủ đô',
        loai: 'Nghị quyết',
        linh_vuc: 'Tài chính - Ngân sách',
        co_quan: 'HĐND TP Hà Nội',
        ngay_ban_hanh: '09/12/2025',
        ngay_ap_dung: '01/01/2026',
        status: 'active',
        nhom: 'phap_quy'
    },
    {
        id: 20,
        soHieu: '02/2024/CT-UBND',
        title: 'Chỉ thị về việc siết chặt kỷ luật, kỷ cương hành chính, nâng cao trách nhiệm người đứng đầu trong giải quyết thủ tục hành chính',
        loai: 'Chỉ thị',
        linh_vuc: 'Cải cách hành chính',
        co_quan: 'Chủ tịch UBND TP',
        ngay_ban_hanh: '15/01/2024',
        ngay_ap_dung: '15/01/2024',
        status: 'active',
        nhom: 'phap_quy'
    },
    {
        id: 21,
        soHieu: '45/2024/QĐ-UBND',
        title: 'Quyết định quy định quản lý, vận hành và khai thác hệ thống xe buýt điện, xe buýt năng lượng xanh trên địa bàn thành phố Hà Nội',
        loai: 'Quyết định',
        linh_vuc: 'Môi trường - Giao thông',
        co_quan: 'UBND TP Hà Nội',
        ngay_ban_hanh: '11/07/2024',
        ngay_ap_dung: '01/08/2024',
        status: 'active',
        nhom: 'phap_quy'
    },
    {
        id: 22,
        soHieu: '07/2025/NQ-HĐND',
        title: 'Nghị quyết phê chuẩn Đề án sắp xếp các đơn vị hành chính cấp xã giai đoạn 2023 - 2025 của thành phố Hà Nội',
        loai: 'Nghị quyết',
        linh_vuc: 'Tư pháp - Thể chế',
        co_quan: 'HĐND TP Hà Nội',
        ngay_ban_hanh: '15/05/2025',
        ngay_ap_dung: '01/07/2025',
        status: 'active',
        nhom: 'phap_quy'
    },
    {
        id: 23,
        soHieu: '19/2023/QĐ-UBND',
        title: 'Quyết định quy định thu giá dịch vụ thoát nước và xử lý nước thải sinh hoạt trên địa bàn thành phố Hà Nội',
        loai: 'Quyết định',
        linh_vuc: 'Tài chính - Ngân sách',
        co_quan: 'UBND TP Hà Nội',
        ngay_ban_hanh: '18/08/2023',
        ngay_ap_dung: '01/09/2023',
        status: 'expired',
        nhom: 'phap_quy'
    },
    {
        id: 24,
        soHieu: '28/2025/QĐ-UBND',
        title: 'Quyết định ban hành Quy chế phối hợp liên ngành trong công tác trợ giúp pháp lý và hòa giải cơ sở trên địa bàn thành phố Hà Nội',
        loai: 'Quyết định',
        linh_vuc: 'Tư pháp - Thể chế',
        co_quan: 'Sở Tư pháp TP Hà Nội',
        ngay_ban_hanh: '05/09/2025',
        ngay_ap_dung: '20/09/2025',
        status: 'active',
        nhom: 'phap_quy'
    }
];

const STATUS_BADGE = {
    active: { label: 'Còn Hiệu lực', cls: 'bg-green-50 text-green-700 border border-green-200' },
    expired: { label: 'Hết Hiệu lực', cls: 'bg-red-50 text-red-700 border border-red-200' },
    pending: { label: 'Chưa có Hiệu lực', cls: 'bg-amber-50 text-amber-700 border border-amber-200' },
};

// ── Quick-action buttons (matching National Portal van-ban/tim-kiem) ───────────
const ActionBtns = ({ doc, onOpenModal }) => (
    <div className="flex flex-wrap gap-1.5 mt-2">
        {[['Tổng quan', 'overview'], ['Nội dung', 'content'], ['Văn bản gốc', 'original'], ['Hiệu lực', 'validity']].map(([label, tab]) => (
            <button
                key={label}
                onClick={() => onOpenModal(doc, tab)}
                className="text-[13px] px-2.5 py-1 border border-gray-300 rounded hover:border-[#0f4c81] hover:text-[#0f4c81] transition-colors text-gray-600 bg-white"
            >
                {label}
            </button>
        ))}
        <button
            onClick={() => alert(`Đang tải tệp đính kèm văn bản ${doc.soHieu}...`)}
            className="text-[13px] px-2.5 py-1 border border-gray-300 rounded hover:border-[#0f4c81] hover:text-[#0f4c81] transition-colors text-gray-600 flex items-center gap-1 bg-white"
        >
            <Download size={13} /> Tải về
        </button>
    </div>
);

// ── Pagination bar (matching National Portal) ─────────────────────────────────
const Pagination = ({ current, total, onChange }) => {
    const pages = () => {
        if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
        if (current <= 4) return [1, 2, 3, 4, 5, '...', total];
        if (current >= total - 3) return [1, '...', total - 4, total - 3, total - 2, total - 1, total];
        return [1, '...', current - 1, current, current + 1, '...', total];
    };

    return (
        <div className="flex flex-wrap justify-center items-center gap-1.5 mt-8">
            <button
                onClick={() => onChange(current - 1)}
                disabled={current === 1}
                className="h-8 px-3 text-[12px] border border-gray-200 rounded bg-white text-gray-500 hover:border-blue-400 hover:text-blue-600 disabled:opacity-30 flex items-center gap-1"
            >
                <ChevronLeft size={13} /> Trước
            </button>
            {pages().map((p, i) =>
                p === '...' ? (
                    <span key={i} className="w-8 h-8 flex items-center justify-center text-gray-400 text-[12px]">...</span>
                ) : (
                    <button
                        key={p}
                        onClick={() => onChange(p)}
                        className={`w-8 h-8 rounded text-[12px] font-semibold border ${current === p
                                ? 'bg-[#0f4c81] border-[#0f4c81] text-white'
                                : 'bg-white border-gray-200 text-gray-700 hover:border-blue-400 hover:text-blue-600'
                            }`}
                    >
                        {p}
                    </button>
                )
            )}
            <button
                onClick={() => onChange(current + 1)}
                disabled={current === total}
                className="h-8 px-3 text-[12px] border border-gray-200 rounded bg-white text-gray-500 hover:border-blue-400 hover:text-blue-600 disabled:opacity-30 flex items-center gap-1"
            >
                Sau <ChevronRight size={13} />
            </button>
        </div>
    );
};

// ── Advanced Search Panel ─────────────────────────────────────────────────────
const AdvancedSearch = ({
    dateType, setDateType,
    dateFrom, setDateFrom,
    dateTo, setDateTo,
    tinhTrang, setTinhTrang,
    selectedDistricts, setSelectedDistricts,
    onClear
}) => {
    const [isDistrictOpen, setIsDistrictOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDistrictOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleDistrict = (dist) => {
        if (selectedDistricts.includes(dist)) {
            setSelectedDistricts(selectedDistricts.filter(d => d !== dist));
        } else {
            setSelectedDistricts([...selectedDistricts, dist]);
        }
    };

    const removeDistrict = (e, dist) => {
        e.stopPropagation();
        setSelectedDistricts(selectedDistricts.filter(d => d !== dist));
    };

    return (
        <div className="mt-4 bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-[16px] text-gray-800">Tìm kiếm nâng cao</h3>
                <button onClick={onClear} className="text-[13px] text-blue-600 hover:underline">
                    Xóa dữ liệu tìm kiếm
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-[14px]">
                {/* Loại ngày */}
                <div>
                    <select
                        value={dateType}
                        onChange={(e) => setDateType(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-white outline-none focus:border-blue-400 text-gray-900"
                    >
                        <option value="Ngày ban hành">Ngày ban hành</option>
                        <option value="Ngày hiệu lực">Ngày hiệu lực</option>
                    </select>
                </div>

                {/* Từ ngày */}
                <div>
                    <input
                        type="date"
                        value={dateFrom}
                        onChange={(e) => setDateFrom(e.target.value)}
                        placeholder="Từ ngày"
                        className={`w-full px-3 py-2 border border-gray-200 rounded-lg outline-none focus:border-blue-400 bg-white ${dateFrom ? 'text-gray-900' : 'text-gray-400'}`}
                    />
                </div>

                {/* Đến ngày */}
                <div>
                    <input
                        type="date"
                        value={dateTo}
                        onChange={(e) => setDateTo(e.target.value)}
                        placeholder="Đến ngày"
                        className={`w-full px-3 py-2 border border-gray-200 rounded-lg outline-none focus:border-blue-400 bg-white ${dateTo ? 'text-gray-900' : 'text-gray-400'}`}
                    />
                </div>

                {/* Tình trạng hiệu lực */}
                <div>
                    <select
                        value={tinhTrang}
                        onChange={(e) => setTinhTrang(e.target.value)}
                        className={`w-full px-3 py-2 border border-gray-200 rounded-lg bg-white outline-none focus:border-blue-400 ${tinhTrang ? 'text-gray-900' : 'text-gray-400'}`}
                    >
                        <option value="">Tình trạng hiệu lực</option>
                        <option value="active">Còn hiệu lực</option>
                        <option value="expired">Hết hiệu lực</option>
                        <option value="pending">Chưa có hiệu lực</option>
                    </select>
                </div>

                {/* Quận / Huyện / Thị xã Multiselect */}
                <div className="md:col-span-1 lg:col-span-2 relative" ref={dropdownRef}>
                    <div
                        onClick={() => setIsDistrictOpen(!isDistrictOpen)}
                        className="w-full px-2 min-h-[38px] border border-gray-200 rounded-lg bg-white flex items-center justify-between cursor-pointer flex-wrap gap-1 py-1"
                    >
                        <div className="flex flex-wrap gap-1 items-center flex-1">
                            {selectedDistricts.length === 0 ? (
                                <span className="text-gray-400 text-[14px] px-1">Quận, Huyện, Thị xã TP Hà Nội</span>
                            ) : (
                                selectedDistricts.map(dist => (
                                    <div key={dist} className="bg-blue-50 text-blue-900 px-2 py-0.5 rounded border border-blue-200 text-[12px] flex items-center gap-1.5 my-0.5">
                                        {dist}
                                        <span
                                            onClick={(e) => removeDistrict(e, dist)}
                                            className="text-blue-500 hover:text-blue-800 font-bold cursor-pointer"
                                        >×</span>
                                    </div>
                                ))
                            )}
                        </div>
                        <ChevronDown size={14} className="text-gray-400 shrink-0 ml-1 mr-1" />
                    </div>

                    {isDistrictOpen && (
                        <div className="absolute z-50 top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto py-1">
                            {HANOI_DISTRICTS.map(dist => (
                                <label key={dist} className="flex items-center px-3 py-1.5 hover:bg-gray-50 cursor-pointer text-[13px] text-gray-700">
                                    <input
                                        type="checkbox"
                                        className="mr-2 accent-[#0f4c81]"
                                        checked={selectedDistricts.includes(dist)}
                                        onChange={() => toggleDistrict(dist)}
                                    />
                                    {dist}
                                </label>
                            ))}
                        </div>
                    )}
                </div>

                {/* Xã / Phường / Thị trấn */}
                <div className="md:col-span-1 lg:col-span-2">
                    <select
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-white outline-none focus:border-blue-400 text-gray-400"
                    >
                        <option value="">Xã / Phường / Thị trấn</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

// ── Left Sidebar Filter ───────────────────────────────────────────────────────
const Sidebar = ({
    nhomPQ, setNhomPQ,
    nhomHN, setNhomHN,
    selectedHinhThuc, toggleHinhThuc,
    onReset, hasFilter
}) => (
    <aside className="w-full lg:w-64 shrink-0">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 sticky top-4">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100">
                <span className="font-bold text-[14px] text-gray-800 flex items-center gap-1.5">
                    <Filter size={14} className="text-[#0f4c81]" /> Bộ lọc tìm kiếm
                </span>
                {hasFilter && (
                    <button onClick={onReset} className="text-[12px] text-blue-600 hover:underline">
                        Bỏ chọn
                    </button>
                )}
            </div>

            {/* Nhóm văn bản */}
            <div className="mb-4">
                <p className="font-semibold text-[11px] text-gray-500 uppercase tracking-normal mb-2 border-b border-gray-100 pb-1">
                    Nhóm văn bản
                </p>
                <label className="flex items-center gap-2 text-[13px] text-gray-600 cursor-pointer mb-1.5 hover:text-gray-900">
                    <input
                        type="checkbox"
                        checked={nhomPQ}
                        onChange={e => setNhomPQ(e.target.checked)}
                        className="accent-[#0f4c81]"
                    />
                    Văn bản quy phạm pháp luật
                </label>
                <label className="flex items-center gap-2 text-[13px] text-gray-600 cursor-pointer hover:text-gray-900">
                    <input
                        type="checkbox"
                        checked={nhomHN}
                        onChange={e => setNhomHN(e.target.checked)}
                        className="accent-[#0f4c81]"
                    />
                    Văn bản hợp nhất
                </label>
            </div>

            {/* Hình thức văn bản */}
            <div>
                <p className="font-semibold text-[11px] text-gray-500 uppercase tracking-normal mb-2 border-b border-gray-100 pb-1">
                    Hình thức văn bản
                </p>
                <div className="max-h-64 overflow-y-auto space-y-1.5 pr-1" style={{ scrollbarWidth: 'thin' }}>
                    {HINH_THUC.map(v => (
                        <label key={v} className="flex items-center gap-2 text-[12px] text-gray-600 cursor-pointer hover:text-gray-900">
                            <input
                                type="checkbox"
                                checked={selectedHinhThuc.includes(v)}
                                onChange={() => toggleHinhThuc(v)}
                                className="accent-[#0f4c81]"
                            />
                            {v}
                        </label>
                    ))}
                </div>
            </div>
        </div>
    </aside>
);

// ── Main Page Component ───────────────────────────────────────────────────────
const HanoiLegalDocsPage = () => {
    useEffect(() => {
        document.title = "Văn bản QPPL - Cổng Pháp luật Thành phố Hà Nội";
        window.scrollTo(0, 0);
    }, []);

    // State for filtering
    const [keyword, setKeyword] = useState('');
    const [scope, setScope] = useState('all');
    const [exactPhrase, setExactPhrase] = useState(false);
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [perPage, setPerPage] = useState(10);
    const [page, setPage] = useState(1);

    // Sidebar filters
    const [nhomPQ, setNhomPQ] = useState(false);
    const [nhomHN, setNhomHN] = useState(false);
    const [selectedHinhThuc, setSelectedHinhThuc] = useState([]);

    // Advanced search filters
    const [dateType, setDateType] = useState('Ngày ban hành');
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [advTinhTrang, setAdvTinhTrang] = useState('');
    const [selectedDistricts, setSelectedDistricts] = useState([]);

    // Modal state
    const [selectedDocForModal, setSelectedDocForModal] = useState(null);
    const [modalActiveTab, setModalActiveTab] = useState('overview');

    const toggleHinhThuc = (v) => setSelectedHinhThuc(prev => prev.includes(v) ? prev.filter(x => x !== v) : [...prev, v]);

    const resetFilters = () => {
        setNhomPQ(false);
        setNhomHN(false);
        setSelectedHinhThuc([]);
        setKeyword('');
        setDateFrom('');
        setDateTo('');
        setAdvTinhTrang('');
        setSelectedDistricts([]);
        setPage(1);
    };

    const hasFilter = nhomPQ || nhomHN || selectedHinhThuc.length > 0 ||
        keyword || dateFrom || dateTo || advTinhTrang || selectedDistricts.length > 0;

    // Filter computation
    const filteredDocs = useMemo(() => {
        return HANOI_DOCUMENTS.filter(doc => {
            const kw = keyword.trim().toLowerCase();
            let matchKw = true;
            if (kw) {
                if (exactPhrase) {
                    if (scope === 'title') matchKw = doc.title.toLowerCase().includes(kw);
                    else if (scope === 'code') matchKw = doc.soHieu.toLowerCase().includes(kw);
                    else matchKw = doc.title.toLowerCase().includes(kw) || doc.soHieu.toLowerCase().includes(kw);
                } else {
                    const terms = kw.split(' ').filter(Boolean);
                    if (scope === 'title') matchKw = terms.every(t => doc.title.toLowerCase().includes(t));
                    else if (scope === 'code') matchKw = terms.every(t => doc.soHieu.toLowerCase().includes(t));
                    else matchKw = terms.every(t => doc.title.toLowerCase().includes(t) || doc.soHieu.toLowerCase().includes(t));
                }
            }

            // Nhóm văn bản
            let matchNhom = true;
            if (nhomPQ && !nhomHN) matchNhom = doc.nhom === 'phap_quy';
            else if (!nhomPQ && nhomHN) matchNhom = doc.nhom === 'hop_nhat';

            // Hình thức
            const matchHinhThuc = selectedHinhThuc.length === 0 || selectedHinhThuc.includes(doc.loai);

            // Tình trạng
            const matchTinhTrang = !advTinhTrang || doc.status === advTinhTrang;

            return matchKw && matchNhom && matchHinhThuc && matchTinhTrang;
        });
    }, [keyword, scope, exactPhrase, nhomPQ, nhomHN, selectedHinhThuc, advTinhTrang]);

    const totalPages = Math.max(1, Math.ceil(filteredDocs.length / perPage));
    const pageDocs = filteredDocs.slice((page - 1) * perPage, page * perPage);

    const handleOpenModal = (doc, tab = 'overview') => {
        setSelectedDocForModal(doc);
        setModalActiveTab(tab);
    };

    const goPage = (p) => {
        setPage(p);
        window.scrollTo({ top: 380, behavior: 'smooth' });
    };

    return (
        <div className="font-sans min-h-screen flex flex-col bg-[#f4f7fb]">
            <HanoiHeader />

            {/* Breadcrumb */}
            <div className="bg-white border-b border-gray-200">
                <div className="container mx-auto px-4 max-w-[1286px] py-3 text-xs sm:text-sm text-gray-500 flex items-center gap-2">
                    <Link to="/ha-noi" className="hover:text-blue-700">Trang chủ Hà Nội</Link>
                    <ChevronRight size={14} />
                    <span className="text-gray-800 font-semibold">Văn bản quy phạm pháp luật</span>
                </div>
            </div>

            {/* Page Header Banner - GIỮ NGUYÊN KHỐI MÔ TẢ TRÊN CÙNG ĐỒNG BỘ PHONG CÁCH CỔNG HÀ NỘI */}
            <div className="relative text-white py-8 sm:py-10 overflow-hidden bg-gradient-to-r from-[#4f56ca] via-[#2c1b92] to-[#4f56ca] border-b border-indigo-400/30">
                {/* CSS Keyframes */}
                <style>{`
                    @keyframes hanoiRotateCW { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                    @keyframes hanoiRotateCCW { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
                    @keyframes hanoiPulseGlow { 0%, 100% { opacity: 0.15; transform: scale(0.95); } 50% { opacity: 0.38; transform: scale(1.12); } }
                    @keyframes hanoiFloatDiamond { 0%, 100% { transform: translateY(0px) rotate(45deg); opacity: 0.3; filter: drop-shadow(0 0 2px #f59e0b); } 50% { transform: translateY(-8px) rotate(45deg); opacity: 0.65; filter: drop-shadow(0 0 5px #f59e0b); } }
                    @keyframes hanoiSweepLight { 0% { transform: translateX(-160%) skewX(-25deg); opacity: 0; } 25% { opacity: 0.32; } 70% { opacity: 0.32; } 100% { transform: translateX(260%) skewX(-25deg); opacity: 0; } }
                `}</style>

                {/* 1. Lưới điểm chấm công nghệ chìm nhẹ */}
                <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.18)_1.1px,transparent_1.1px)] [background-size:20px_20px] pointer-events-none" />

                {/* 2. Dải quét sáng mềm mại chạy êm ái */}
                <div
                    className="absolute inset-y-0 w-2/5 bg-gradient-to-r from-transparent via-amber-200/20 via-white/25 to-transparent pointer-events-none"
                    style={{ animation: 'hanoiSweepLight 5s cubic-bezier(0.4, 0, 0.2, 1) infinite' }}
                />

                {/* 3. Quầng sáng công nghệ lan tỏa */}
                <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-amber-300/30 blur-3xl pointer-events-none" style={{ animation: 'hanoiPulseGlow 4s ease-in-out infinite' }} />
                <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-amber-400/30 blur-3xl pointer-events-none" style={{ animation: 'hanoiPulseGlow 4.5s ease-in-out infinite 1s' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[220px] bg-indigo-500/25 blur-[80px] pointer-events-none" style={{ animation: 'hanoiPulseGlow 5.5s ease-in-out infinite 0.5s' }} />

                {/* 4. Vòng tròn quỹ đạo thanh mảnh xoay tròn */}
                <div className="absolute -left-16 -top-16 w-64 h-64 rounded-full border border-amber-500/20 pointer-events-none" />
                <div className="absolute -left-8 -top-8 w-48 h-48 rounded-full border border-amber-600/35 border-dashed pointer-events-none shadow-[0_0_12px_rgba(245,158,11,0.2)]" style={{ animation: 'hanoiRotateCW 16s linear infinite' }} />
                <div className="absolute -right-16 -bottom-16 w-72 h-72 rounded-full border border-amber-500/20 pointer-events-none" />
                <div className="absolute -right-8 -bottom-8 w-56 h-56 rounded-full border border-amber-600/35 border-dashed pointer-events-none shadow-[0_0_12px_rgba(245,158,11,0.2)]" style={{ animation: 'hanoiRotateCCW 18s linear infinite' }} />

                {/* 5. Điểm nhấn kim cương ánh kim */}
                <div className="absolute top-6 left-[14%] w-3 h-3 bg-amber-400/40 border border-amber-200/60 rounded-sm pointer-events-none shadow-[0_0_6px_#f59e0b]" style={{ animation: 'hanoiFloatDiamond 3.2s ease-in-out infinite' }} />
                <div className="absolute bottom-6 right-[14%] w-3 h-3 bg-amber-500/40 border border-amber-200/60 rounded-sm pointer-events-none shadow-[0_0_6px_#f59e0b]" style={{ animation: 'hanoiFloatDiamond 3.6s ease-in-out infinite 0.8s' }} />

                <div className="container mx-auto px-4 max-w-[1286px] relative z-10">
                    <h1 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white drop-shadow-md">
                        Hệ thống Văn bản quy phạm pháp luật TP Hà Nội
                    </h1>
                    <div className="w-20 sm:w-28 h-0.5 bg-gradient-to-r from-amber-400 to-transparent my-1.5 rounded-full" />
                    <p className="text-xs sm:text-sm text-amber-50/95 mt-1 max-w-3xl leading-relaxed drop-shadow-sm font-normal">
                        Tra cứu đầy đủ các Nghị quyết HĐND, Quyết định UBND Thành phố và văn bản hướng dẫn Luật Thủ Đô
                    </p>
                </div>
            </div>

            {/* ── Main 2-column Container matching /van-ban/tim-kiem ── */}
            <div className="container mx-auto px-4 max-w-[1286px] pt-6 pb-16 flex flex-col lg:flex-row gap-6">

                {/* ── Left Sidebar Filter ── */}
                <Sidebar
                    nhomPQ={nhomPQ} setNhomPQ={setNhomPQ}
                    nhomHN={nhomHN} setNhomHN={setNhomHN}
                    selectedHinhThuc={selectedHinhThuc} toggleHinhThuc={toggleHinhThuc}
                    onReset={resetFilters} hasFilter={hasFilter}
                />

                {/* ── Main Content Area ── */}
                <main className="flex-1 min-w-0">

                    {/* Search & Filter Card */}
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 mb-4">
                        <h2 className="text-[20px] sm:text-[22px] font-bold text-[#0f4c81] mb-1">
                            Danh sách Văn bản quy phạm pháp luật TP Hà Nội
                        </h2>

                        {/* Search Bar */}
                        <form onSubmit={e => { e.preventDefault(); setPage(1); }} className="flex gap-2 mb-3">
                            <div className="relative flex-1">
                                <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    value={keyword}
                                    onChange={e => { setKeyword(e.target.value); setPage(1); }}
                                    className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-[13px] outline-none focus:border-[#0f4c81]"
                                    placeholder="Nhập từ khóa, số hiệu, tên cơ quan hoặc câu hỏi pháp lý..."
                                />
                            </div>
                            <button
                                type="submit"
                                className="px-5 py-2.5 bg-[#0f4c81] hover:bg-blue-800 text-white font-semibold rounded-lg text-[13px] transition-colors shrink-0 shadow-sm"
                            >
                                Tìm kiếm
                            </button>
                        </form>

                        {/* Scope + per-page */}
                        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-[12px] text-gray-600 pt-1">
                            <div className="flex items-center gap-3.5 flex-wrap">
                                {[['all', 'Tất cả'], ['title', 'Tiêu đề'], ['code', 'Số hiệu văn bản']].map(([v, lbl]) => (
                                    <label key={v} className="flex items-center gap-1.5 cursor-pointer">
                                        <input
                                            type="radio"
                                            value={v}
                                            checked={scope === v}
                                            onChange={() => { setScope(v); setPage(1); }}
                                            className="accent-[#0f4c81]"
                                        />
                                        {lbl}
                                    </label>
                                ))}
                                <label className="flex items-center gap-1.5 cursor-pointer ml-1">
                                    <input
                                        type="checkbox"
                                        checked={exactPhrase}
                                        onChange={e => { setExactPhrase(e.target.checked); setPage(1); }}
                                        className="accent-[#0f4c81]"
                                    />
                                    Cụm từ chính xác
                                </label>
                            </div>

                            <div className="flex items-center gap-3">
                                <button
                                    type="button"
                                    onClick={() => setShowAdvanced(s => !s)}
                                    className="flex items-center gap-1 text-[#0f4c81] hover:underline text-[12px] font-medium"
                                >
                                    Tìm kiếm nâng cao
                                    {showAdvanced ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                                </button>
                                <select
                                    value={perPage}
                                    onChange={e => { setPerPage(+e.target.value); setPage(1); }}
                                    className="border border-gray-200 rounded px-2.5 py-1 text-[12px] outline-none focus:border-[#0f4c81] bg-white text-gray-700"
                                >
                                    {[10, 20, 50].map(n => (
                                        <option key={n} value={n}>{n} văn bản/trang</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Advanced Search Accordion */}
                        {showAdvanced && (
                            <AdvancedSearch
                                dateType={dateType} setDateType={setDateType}
                                dateFrom={dateFrom} setDateFrom={setDateFrom}
                                dateTo={dateTo} setDateTo={setDateTo}
                                tinhTrang={advTinhTrang} setTinhTrang={setAdvTinhTrang}
                                selectedDistricts={selectedDistricts} setSelectedDistricts={setSelectedDistricts}
                                onClear={resetFilters}
                            />
                        )}
                    </div>

                    {/* Results Card */}
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                        <p className="text-[13px] text-gray-500 italic mb-5 pb-3 border-b border-gray-100">
                            Có tất cả <strong>{filteredDocs.length}</strong> văn bản
                        </p>

                        {pageDocs.length === 0 ? (
                            <div className="text-center py-16 text-gray-400">
                                <FileText size={40} className="mx-auto mb-3 opacity-30 text-[#0f4c81]" />
                                <p className="text-[14px]">Không tìm thấy văn bản phù hợp với điều kiện tìm kiếm.</p>
                                <button
                                    onClick={resetFilters}
                                    className="mt-3 text-[13px] text-[#0f4c81] font-semibold hover:underline"
                                >
                                    Đặt lại tất cả bộ lọc
                                </button>
                            </div>
                        ) : (
                            <div className="divide-y divide-gray-100">
                                {pageDocs.map((doc, idx) => {
                                    const sb = STATUS_BADGE[doc.status] || STATUS_BADGE.active;
                                    const globalIdx = (page - 1) * perPage + idx + 1;

                                    return (
                                        <div key={doc.id} className="flex flex-col sm:flex-row gap-4 py-5 first:pt-0">
                                            {/* STT Badge */}
                                            <div className="w-10 h-10 rounded-lg bg-[#0f4c81] text-white text-[14px] font-bold flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                                                {String(globalIdx).padStart(2, '0')}
                                            </div>

                                            {/* Main Body */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                                                    <span className="font-semibold text-xs text-red-700 bg-red-50 border border-red-200 px-2.5 py-0.5 rounded">
                                                        {doc.soHieu}
                                                    </span>
                                                    <span className="text-xs font-semibold text-blue-800 bg-blue-50 px-2 py-0.5 rounded">
                                                        {doc.co_quan}
                                                    </span>
                                                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                                                        {doc.linh_vuc}
                                                    </span>
                                                </div>

                                                <h3
                                                    onClick={() => handleOpenModal(doc, 'overview')}
                                                    className="text-[15px] sm:text-[16px] font-bold text-blue-700 hover:underline leading-snug cursor-pointer transition"
                                                >
                                                    {doc.title}
                                                </h3>

                                                <ActionBtns doc={doc} onOpenModal={handleOpenModal} />
                                            </div>

                                            {/* Right Meta */}
                                            <div className="shrink-0 text-left sm:text-right text-[13px] text-gray-500 min-w-[150px] space-y-1.5 mt-0.5 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                                                <p><span className="text-gray-400">Áp dụng:</span> {doc.ngay_ap_dung}</p>
                                                <p><span className="text-gray-400">Ban hành:</span> {doc.ngay_ban_hanh}</p>
                                                <span className={`inline-block px-2.5 py-1 rounded text-[12px] font-semibold ${sb.cls}`}>
                                                    {sb.label}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        {totalPages > 1 && (
                            <Pagination current={page} total={totalPages} onChange={goPage} />
                        )}
                    </div>
                </main>
            </div>

            {/* Document Detail Modal */}
            {selectedDocForModal && (
                <div className="fixed inset-0 bg-black/60 z-[200] flex items-center justify-center p-4 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
                        <button
                            onClick={() => setSelectedDocForModal(null)}
                            className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100"
                        >
                            <X size={20} />
                        </button>

                        <div className="flex items-center gap-2 mb-3">
                            <span className="text-xs font-bold text-red-700 bg-red-50 border border-red-200 px-3 py-1 rounded">
                                {selectedDocForModal.soHieu}
                            </span>
                            <span className={`text-xs font-semibold px-2.5 py-1 rounded ${STATUS_BADGE[selectedDocForModal.status]?.cls || 'bg-green-50 text-green-700'}`}>
                                {STATUS_BADGE[selectedDocForModal.status]?.label || 'Còn Hiệu lực'}
                            </span>
                        </div>

                        <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4 leading-snug">
                            {selectedDocForModal.title}
                        </h3>

                        {/* Modal Navigation Tabs */}
                        <div className="flex border-b border-gray-200 mb-4">
                            {[
                                ['overview', 'Tổng quan'],
                                ['content', 'Nội dung'],
                                ['original', 'Văn bản gốc'],
                                ['validity', 'Hiệu lực']
                            ].map(([tabKey, tabTitle]) => (
                                <button
                                    key={tabKey}
                                    onClick={() => setModalActiveTab(tabKey)}
                                    className={`py-2 px-3 text-xs sm:text-sm font-semibold border-b-2 transition ${modalActiveTab === tabKey
                                            ? 'border-[#0f4c81] text-[#0f4c81]'
                                            : 'border-transparent text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    {tabTitle}
                                </button>
                            ))}
                        </div>

                        {modalActiveTab === 'overview' && (
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-3 text-xs bg-gray-50 p-4 rounded-xl">
                                    <div><span className="text-gray-500">Cơ quan ban hành:</span> <strong>{selectedDocForModal.co_quan}</strong></div>
                                    <div><span className="text-gray-500">Hình thức:</span> <strong>{selectedDocForModal.loai}</strong></div>
                                    <div><span className="text-gray-500">Ngày ban hành:</span> <strong>{selectedDocForModal.ngay_ban_hanh}</strong></div>
                                    <div><span className="text-gray-500">Ngày có hiệu lực:</span> <strong>{selectedDocForModal.ngay_ap_dung}</strong></div>
                                    <div className="col-span-2"><span className="text-gray-500">Lĩnh vực:</span> <strong>{selectedDocForModal.linh_vuc}</strong></div>
                                </div>
                                <div>
                                    <h4 className="font-bold text-xs uppercase text-gray-700 mb-1.5">Tóm tắt văn bản</h4>
                                    <p className="text-xs text-gray-600 leading-relaxed text-justify bg-blue-50/40 p-3 rounded-lg border border-blue-100">
                                        Văn bản quy phạm pháp luật của Thành phố Hà Nội hướng dẫn thi hành các quy định pháp luật và Luật Thủ Đô, áp dụng đối với các cơ quan, tổ chức, cá nhân trên địa bàn 30 quận, huyện, thị xã.
                                    </p>
                                </div>
                            </div>
                        )}

                        {modalActiveTab === 'content' && (
                            <div className="space-y-3 text-xs text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-200">
                                <p className="font-bold text-center uppercase text-gray-900">{selectedDocForModal.title}</p>
                                <p className="text-center italic text-gray-500">Số ký hiệu: {selectedDocForModal.soHieu}</p>
                                <hr className="my-2 border-gray-200" />
                                <p><strong>Điều 1. Phạm vi điều chỉnh và đối tượng áp dụng</strong></p>
                                <p>1. Văn bản này quy định chi tiết các cơ chế, biện pháp triển khai thực thi các quy định pháp luật và cơ chế đặc thù áp dụng trên địa bàn Thành phố Hà Nội.</p>
                                <p>2. Đối tượng áp dụng gồm các cơ quan hành chính nhà nước, tổ chức kinh tế, xã hội và công dân cư trú, hoạt động trên địa bàn Thủ đô.</p>
                                <p><strong>Điều 2. Trách nhiệm thi hành</strong></p>
                                <p>Giao Sở Tư pháp phối hợp cùng các Sở, Ban, Ngành và UBND 30 quận, huyện, thị xã tổ chức tuyên truyền, hướng dẫn và giám sát việc thực hiện.</p>
                            </div>
                        )}

                        {modalActiveTab === 'original' && (
                            <div className="text-center py-10 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                                <FileText size={36} className="mx-auto text-gray-400 mb-2" />
                                <p className="text-xs font-semibold text-gray-700">Tệp văn bản gốc có chữ ký số và dấu đỏ</p>
                                <p className="text-[11px] text-gray-500 mt-1">Định dạng: PDF (Scan bản gốc lưu trữ cơ quan)</p>
                                <button
                                    onClick={() => alert(`Đang tải tệp bản gốc của ${selectedDocForModal.soHieu}...`)}
                                    className="mt-3 px-4 py-1.5 bg-[#0f4c81] text-white text-xs font-bold rounded-lg hover:bg-blue-800 transition inline-flex items-center gap-1.5"
                                >
                                    <Download size={13} /> Tải bản gốc PDF
                                </button>
                            </div>
                        )}

                        {modalActiveTab === 'validity' && (
                            <div className="space-y-3 text-xs">
                                <div className="p-3 rounded-lg bg-green-50 border border-green-200 text-green-800 flex items-center gap-2">
                                    <CheckCircle2 size={16} className="text-green-600 shrink-0" />
                                    <span>Tình trạng: <strong>{STATUS_BADGE[selectedDocForModal.status]?.label || 'Còn Hiệu lực'}</strong></span>
                                </div>
                                <div className="grid grid-cols-2 gap-2 bg-gray-50 p-3 rounded-lg text-gray-600">
                                    <div>Ngày ban hành: <strong>{selectedDocForModal.ngay_ban_hanh}</strong></div>
                                    <div>Ngày có hiệu lực: <strong>{selectedDocForModal.ngay_ap_dung}</strong></div>
                                    <div>Phạm vi: <strong>Toàn thành phố Hà Nội</strong></div>
                                    <div>Cơ quan thẩm tra: <strong>Sở Tư pháp Hà Nội</strong></div>
                                </div>
                            </div>
                        )}

                        <div className="flex items-center justify-end gap-3 pt-4 mt-4 border-t border-gray-100">
                            <button
                                onClick={() => setSelectedDocForModal(null)}
                                className="px-4 py-2 text-xs font-bold text-gray-600 hover:bg-gray-100 rounded-lg transition"
                            >
                                Đóng
                            </button>
                            <button
                                onClick={() => alert(`Đang tải toàn văn văn bản ${selectedDocForModal.soHieu}...`)}
                                className="px-5 py-2 text-xs font-bold text-white bg-[#0f4c81] hover:bg-blue-800 rounded-lg flex items-center gap-1.5 shadow transition"
                            >
                                <Download size={14} /> Tải toàn văn PDF
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <HanoiFooter />
        </div>
    );
};

export default HanoiLegalDocsPage;

import React from 'react';

// --- HELPER FUNCTIONS ---
export const getFileIcon = (fileName) => {
    if (!fileName) return null;
    const lowerName = fileName.toLowerCase();

    if (lowerName.endsWith('.pdf')) return (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="12" y="4" width="16" height="24" rx="1" fill="#FFFFFF" stroke="#E3242B" strokeWidth="1.5" />
            <rect x="16" y="10" width="8" height="1.5" fill="#E3242B" />
            <rect x="16" y="14" width="8" height="1.5" fill="#E3242B" />
            <rect x="16" y="18" width="6" height="1.5" fill="#E3242B" />
            <path d="M4 8C4 7.44772 4.44772 7 5 7H14V25H5C4.44772 25 4 24.5523 4 24V8Z" fill="#E3242B" />
            <text x="5.5" y="18" fill="white" fontSize="9" fontWeight="bold" fontFamily="Arial">PDF</text>
        </svg>
    );

    if (lowerName.endsWith('.doc') || lowerName.endsWith('.docx')) return (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="12" y="4" width="16" height="24" rx="1" fill="#FFFFFF" stroke="#185ABD" strokeWidth="1.5" />
            <rect x="16" y="10" width="8" height="1.5" fill="#185ABD" />
            <rect x="16" y="14" width="8" height="1.5" fill="#185ABD" />
            <rect x="16" y="18" width="8" height="1.5" fill="#185ABD" />
            <rect x="16" y="22" width="6" height="1.5" fill="#185ABD" />
            <path d="M4 8C4 7.44772 4.44772 7 5 7H14V25H5C4.44772 25 4 24.5523 4 24V8Z" fill="#2B579A" />
            <path d="M6 11L7 19H8.5L9.5 15L10.5 19H12L13 11H11.5L10.8 16L9.8 11H8.2L7.2 16L6.5 11H6Z" fill="white" />
        </svg>
    );

    if (lowerName.endsWith('.xls') || lowerName.endsWith('.xlsx')) return (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="12" y="4" width="16" height="24" rx="1" fill="#FFFFFF" stroke="#107C41" strokeWidth="1.5" />
            <path d="M15 10H25M15 14H25M15 18H25M15 22H25M15 10V22M19 10V22M23 10V22" stroke="#107C41" strokeWidth="1" />
            <path d="M4 8C4 7.44772 4.44772 7 5 7H14V25H5C4.44772 25 4 24.5523 4 24V8Z" fill="#107C41" />
            <path d="M6.5 11L8.5 15L6.5 19H8.5L9.5 16.5L10.5 19H12.5L10.5 15L12.5 11H10.5L9.5 13.5L8.5 11H6.5Z" fill="white" />
        </svg>
    );

    return <div className="flex h-8 w-8 items-center justify-center rounded bg-gray-500 text-[10px] font-bold text-white shadow-sm">FILE</div>;
};

export const getDocStatusBadge = (status) => {
    switch (status) {
        case 1: return <span className="px-2.5 py-0.5 bg-[#E8F5E9] text-[#2E7D32] rounded-full text-[11px] font-bold border border-[#C8E6C9] flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#2E7D32]"></span> Còn hiệu lực</span>;
        case 0: return <span className="px-2.5 py-0.5 bg-[#FFEBEE] text-[#C62828] rounded-full text-[11px] font-bold border border-[#FFCDD2] flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#C62828]"></span> Hết hiệu lực</span>;
        case 2: return <span className="px-2.5 py-0.5 bg-[#FFF8E1] text-[#F57F17] rounded-full text-[11px] font-bold border border-[#FFECB3] flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#F57F17]"></span> Chưa hiệu lực</span>;
        default: return null;
    }
};

export const getDocStatusText = (status) => {
    switch (status) {
        case 1: return "Còn hiệu lực";
        case 0: return "Hết hiệu lực";
        case 2: return "Chưa hiệu lực";
        default: return "";
    }
};

// --- DATA DEFINITIONS ---

export const NAV_ITEMS = [
    { key: "trang-chu", label: "Tổng quan" },
    {
        key: "gioi-thieu",
        label: "Giới thiệu",
        children: [
            { key: "chuong-trinh-lien-nganh-intro", label: "Chương trình hỗ trợ pháp lý liên ngành" },
            { key: "chuc-nang-nhiem-vu", label: "Chức năng, nhiệm vụ" },
            { key: "co-cau-to-chuc", label: "Cơ cấu tổ chức" },
            { key: "lien-he", label: "Liên hệ" }
        ]
    },
    {
        key: "hoat-dong-trung-tam",
        label: "Hoạt động Trung tâm",
        children: [
            { key: "tin-tuc-noi-bat", label: "Tin tức nổi bật" },
            { key: "thong-bao", label: "Thông báo" },
            { key: "su-kien", label: "Sự kiện" },
            { key: "hoat-dong-phoi-hop", label: "Hoạt động phối hợp" },
            { key: "multimedia", label: "Multimedia" },
        ]
    },
    {
        key: "dao-tao",
        label: "Đào tạo",
        children: [
            { key: "ke-hoach-dao-tao", label: "Kế hoạch đào tạo" },
            { key: "khoa-hoc", label: "Khóa học" }
        ]
    },
    {
        key: "tu-van-phap-luat",
        label: "Tư vấn pháp luật",
        children: [
            { key: "hoi-dap-phap-luat", label: "Hỏi đáp pháp luật" },
            { key: "tu-van-chuyen-sau", label: "Tư vấn chuyên sâu" },
            { key: "mang-luoi-tu-van-vien", label: "Mạng lưới tư vấn viên" },
            { key: "bieu-mau-hop-dong", label: "Biểu mẫu, hợp đồng" },
            { key: "tai-lieu-htpl", label: "Tài liệu HTPL doanh nghiệp" },
            { key: "vu-viec-dien-hinh", label: "Vụ việc điển hình" }
        ]
    },
    {
        key: "van-ban-chinh-sach-moi",
        label: "Văn bản pháp luật",
        children: [
            { key: "van-ban-moi-ban-hanh", label: "Văn bản chính sách mới" },
            { key: "van-ban-phap-luat", label: "Văn bản pháp luật về doanh nghiệp" }
        ]
    },
    {
        key: "nghien-cuu-trao-doi",
        label: "Nghiên cứu - trao đổi",
        children: [
            { key: "bai-viet-chuyen-gia", label: "Bài viết chuyên gia" },
            { key: "phong-van", label: "Phỏng vấn" },
            { key: "nghien-cuu-trao-doi-chi-tiet", label: "Nghiên cứu trao đổi" },
            { key: "kinh-nghiem-thuc-tien", label: "Kinh nghiệm thực tiễn" }
        ]
    },
    {
        key: "chuong-trinh-ke-hoach",
        label: "Chương trình - Kế hoạch",
        children: [
            { key: "tong-quan-chuong-trinh", label: "Tổng quan chương trình - kế hoạch" },
            { key: "chuong-trinh-bo-nganh", label: "Chương trình - Kế hoạch bộ, ngành" },
            { key: "chuong-trinh-dia-phuong", label: "Chương trình - Kế hoạch địa phương" }
        ]
    }
];

export const bieuMauData = [
    { id: 201, title: "Mẫu hợp đồng mua bán hàng hóa", agency: "Bộ Công Thương", type: "Biểu mẫu", field: "Thương mại", fileName: "Mau_HD_MuaBan.doc", date: "15/04/2026", summary: "Mẫu hợp đồng mua bán hàng hóa chuẩn dành cho doanh nghiệp trong nước và quốc tế...", attachments: [{ name: "Mau_HD_MuaBan_BanChuan.doc", url: "#" }, { name: "PhuLuc_HD.docx", url: "#" }] },
    { id: 204, title: "Mẫu hợp đồng lao động chuẩn", agency: "Bộ Lao động - Thương binh và Xã hội", type: "Biểu mẫu", field: "Lao động", fileName: "HopDong_LaoDong.docx", date: "10/04/2026", summary: "Hợp đồng lao động mẫu theo Bộ Luật Lao động dạng Word, dễ dàng chỉnh sửa thông tin người lao động...", attachments: [{ name: "HopDong_LaoDong_2026.docx", url: "#" }] },
    { id: 206, title: "Bảng tính lương nhân viên mẫu", agency: "Bộ Tài chính", type: "Biểu mẫu", field: "Nhân sự - Kế toán", fileName: "BangTinhLuong.xlsx", date: "08/04/2026", summary: "File excel mẫu tính lương cho nhân viên có thiết lập sẵn công thức tính thuế TNCN và BHXH...", attachments: [{ name: "Bang_Tinh_Luong_NV_2026.xlsx", url: "#" }] },
    { id: 202, title: "Mẫu điều lệ công ty cổ phần", agency: "Bộ Kế hoạch và Đầu tư", type: "Biểu mẫu", field: "Doanh nghiệp", fileName: "DieuLe_CTCP.pdf", date: "14/04/2026", summary: "Mẫu điều lệ công ty cổ phần mới nhất theo Luật Doanh nghiệp hiện hành, đầy đủ các điều khoản cơ bản...", attachments: [{ name: "DieuLe_CTCP_2026.pdf", url: "#" }] },
    { id: 203, title: "Mẫu nội quy lao động", agency: "Bộ Lao động - Thương binh và Xã hội", type: "Biểu mẫu", field: "Lao động", fileName: "NoiQuy_LaoDong.pdf", date: "12/04/2026", summary: "Nội quy lao động mẫu cho doanh nghiệp vừa và nhỏ, bao gồm kỷ luật lao động và thời giờ làm việc...", attachments: [{ name: "NoiQuy_LaoDong_Standard.pdf", url: "#" }] },
    { id: 205, title: "Mẫu biên bản họp hội đồng quản trị", agency: "Bộ Kế hoạch và Đầu tư", type: "Biểu mẫu", field: "Doanh nghiệp", fileName: "BienBan_HDQT.pdf", date: "09/04/2026", summary: "Biên bản mẫu cho các cuộc họp HĐQT định kỳ, ghi nhận nghị quyết và biểu quyết...", attachments: [{ name: "BienBan_HopHDQT.pdf", url: "#" }] },
    { id: 207, title: "Mẫu báo cáo kết quả hoạt động kinh doanh", agency: "Bộ Tài chính", type: "Biểu mẫu", field: "Nhân sự - Kế toán", fileName: "BaoCao_KD.xlsx", date: "05/04/2026", summary: "Mẫu bảng báo cáo doanh thu chi phí file excel phục vụ cho việc theo dõi nội bộ...", attachments: [{ name: "BaoCao_KQKQ_Thang.xlsx", url: "#" }] },
    { id: 208, title: "Mẫu quyết định bổ nhiệm giám đốc", agency: "Bộ Kế hoạch và Đầu tư", type: "Biểu mẫu", field: "Doanh nghiệp", fileName: "QD_BoNhiem.docx", date: "01/04/2026", summary: "Quyết định bổ nhiệm chức danh quản lý trong doanh nghiệp theo chuẩn biểu mẫu hành chính...", attachments: [{ name: "QuyetDinh_BoNhiem_GiamDoc.docx", url: "#" }] },
    { id: 209, title: "Mẫu hợp đồng cho thuê mặt bằng", agency: "Bộ Xây dựng", type: "Biểu mẫu", field: "Thương mại", fileName: "HD_ThueNha.doc", date: "28/03/2026", summary: "Hợp đồng thuê mặt bằng kinh doanh, thuê văn phòng với các điều khoản bảo vệ quyền lợi hai bên...", attachments: [{ name: "Hop_Dong_Thue_Mat_Bang.doc", url: "#" }] },
    { id: 210, title: "Mẫu biên bản thanh lý hợp đồng", agency: "Bộ Công Thương", type: "Biểu mẫu", field: "Thương mại", fileName: "ThanhLy_HD.pdf", date: "20/03/2026", summary: "Biên bản thỏa thuận thanh lý hợp đồng giữa 2 bên sau khi hoàn tất nghĩa vụ...", attachments: [{ name: "BienBan_ThanhLyHopDong.pdf", url: "#" }] },
    { id: 211, title: "Đơn xin nghỉ việc / Chấm dứt hợp đồng lao động", agency: "Bộ Lao động - Thương binh và Xã hội", type: "Biểu mẫu", field: "Lao động", fileName: "DonNghiViec.docx", date: "15/03/2026", summary: "Mẫu đơn xin nghỉ việc chuẩn theo quy định luật pháp dành cho người lao động...", attachments: [{ name: "Don_Xin_Nghi_Viec.docx", url: "#" }] },
    { id: 212, title: "Phiếu thu / Phiếu chi nội bộ doanh nghiệp", agency: "Bộ Tài chính", type: "Biểu mẫu", field: "Nhân sự - Kế toán", fileName: "PhieuThuChi.xlsx", date: "10/03/2026", summary: "Mẫu phiếu thu chi tự động định dạng dùng in ấn nhanh khổ A5...", attachments: [{ name: "Phieu_Thu_Chi_Standard.xlsx", url: "#" }] }
];

export const taiLieuHTPLData = [
    { id: 1401, title: "Cẩm nang hướng dẫn khởi nghiệp cho DNNVV", date: "10/04/2026", summary: "Tài liệu tổng hợp các bước cơ bản để thành lập và vận hành doanh nghiệp mới theo chuẩn quy định hiện hành...", thumb: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=300&q=80", attachments: [{ name: "Cam_Nang_Khoi_Nghiep.pdf", url: "#", size: "2.4 MB" }], content: "<h3>Lời nói đầu</h3><p>Khởi nghiệp là một hành trình đầy thách thức và cơ hội. Tài liệu này được biên soạn nhằm cung cấp cho các doanh nghiệp nhỏ và vừa (DNNVV) những kiến thức nền tảng về pháp lý, từ khâu thành lập đến vận hành doanh nghiệp.</p><h3>Chương 1: Thành lập doanh nghiệp</h3><p>Để thành lập một doanh nghiệp, chủ doanh nghiệp cần chuẩn bị các giấy tờ sau: Giấy đề nghị đăng ký doanh nghiệp, Điều lệ công ty, Danh sách thành viên/cổ đông, Bản sao giấy tờ pháp lý cá nhân của người đại diện pháp luật. Hồ sơ được nộp tại Phòng Đăng ký kinh doanh thuộc Sở Kế hoạch và Đầu tư tỉnh/thành phố nơi doanh nghiệp đặt trụ sở chính.</p><h3>Chương 2: Con dấu pháp lý</h3><p>Sau khi được cấp Giấy chứng nhận đăng ký doanh nghiệp, doanh nghiệp tiến hành khắc con dấu tại cơ sở được phép khắc dấu. Mẫu con dấu phải được thông báo với cơ quan đăng ký kinh doanh trước khi sử dụng.</p><h3>Chương 3: Nghĩa vụ thuế ban đầu</h3><p>Doanh nghiệp mới thành lập phải thực hiện kê khai và nộp thuế môn bài trong thời hạn 30 ngày kể từ ngày được cấp Giấy chứng nhận đăng ký doanh nghiệp. Mức thuế môn bài phụ thuộc vào vốn điều lệ đăng ký: trên 10 tỷ đồng: 3 triệu/năm; dưới 10 tỷ đồng: 2 triệu/năm.</p><h3>Chương 4: Lao động và bảo hiểm</h3><p>Khi tuyển dụng lao động, doanh nghiệp phải ký kết hợp đồng lao động bằng văn bản, đăng ký lao động với cơ quan quản lý nhà nước về lao động, và thực hiện đóng bảo hiểm xã hội, bảo hiểm y tế, bảo hiểm thất nghiệp cho người lao động theo quy định.</p>" },
    { id: 1402, title: "Sổ tay pháp lý về Hợp đồng thương mại", date: "08/04/2026", summary: "Các lưu ý quan trọng khi soạn thảo và ký kết hợp đồng thương mại nhằm giảm thiểu rủi ro pháp lý cho công ty...", thumb: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=300&q=80", attachments: [{ name: "So_Tay_Hop_Dong.pdf", url: "#", size: "3.1 MB" }], content: "<h3>Giới thiệu</h3><p>Hợp đồng thương mại là công cụ pháp lý quan trọng nhất trong hoạt động kinh doanh. Một hợp đồng được soạn thảo kỹ lưỡng sẽ bảo vệ quyền lợi của doanh nghiệp và giảm thiểu tranh chấp.</p><h3>Điều kiện có hiệu lực của hợp đồng</h3><p>Theo Bộ luật Dân sự 2015, hợp đồng có hiệu lực khi: Các bên tham gia có năng lực hành vi dân sự đầy đủ; Mục đích và nội dung không vi phạm điều cấm của luật; Hình thức phù hợp với quy định của pháp luật. Đối với một số hợp đồng đặc thù (mua bán bất động sản, chuyển nhượng vốn), pháp luật yêu cầu phải công chứng, chứng thực.</p><h3>Các điều khoản cơ bản</h3><p>Một hợp đồng thương mại chuẩn cần có các điều khoản: Thông tin các bên; Đối tượng hợp đồng; Số lượng, chất lượng; Giá cả và phương thức thanh toán; Thời hạn, địa điểm thực hiện; Phạt vi phạm và bồi thường thiệt hại; Giải quyết tranh chấp.</p><h3>Rủi ro pháp lý thường gặp</h3><p>Các rủi ro thường gặp: Điều khoản không rõ ràng dẫn đến hiểu nhầm; Thiếu điều khoản phạt vi phạm; Không quy định rõ thời hạn thực hiện; Không có cơ chế giải quyết tranh chấp hiệu quả.</p>" },
    { id: 1403, title: "Hướng dẫn thủ tục quyết toán thuế năm 2026", date: "05/04/2026", summary: "Chi tiết các bước quyết toán thuế TNDN, TNCN dành cho bộ phận kế toán của các doanh nghiệp vừa và nhỏ...", thumb: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=300&q=80", attachments: [{ name: "Huong_Dan_Quyet_Toan_Thue.pdf", url: "#", size: "1.8 MB" }], content: "<h3>Tổng quan</h3><p>Quyết toán thuế là nghĩa vụ bắt buộc của mọi doanh nghiệp tại Việt Nam. Tài liệu này hướng dẫn chi tiết quy trình quyết toán thuế thu nhập doanh nghiệp (TNDN) và thuế thu nhập cá nhân (TNCN) năm 2026.</p><h3>Thời hạn nộp hồ sơ quyết toán</h3><p>Đối với thuế TNDN: Chậm nhất là ngày thứ 90 kể từ ngày kết thúc năm dương lịch hoặc năm tài chính. Đối với thuế TNCN: Cùng thời hạn với quyết toán thuế TNDN. Trường hợp doanh nghiệp bị giải thể, chấm dứt hoạt động thì thời hạn nộp là 45 ngày kể từ ngày có quyết định giải thể.</p><h3>Hồ sơ quyết toán thuế TNDN</h3><p>Tờ khai quyết toán thuế TNDN mẫu 03/TNDN; Báo cáo tài chính năm; Các phụ lục kèm theo (nếu có).</p><h3>Hồ sơ quyết toán thuế TNCN</h3><p>Tờ khai quyết toán thuế TNCN mẫu 05/QTT-TNCN; Bảng kê thu nhập chịu thuế; Chứng từ khấu trừ thuế (nếu có).</p><h3>Lưu ý quan trọng</h3><p>Các chi phí được trừ khi tính thuế TNDN phải có hóa đơn, chứng từ hợp pháp; Chi phí lương phải có quy chế lương và hợp đồng lao động; Chi phí quảng cáo, tiếp thị, hoa hồng bị giới hạn ở mức 15% tổng chi phí hợp lý (trừ một số trường hợp đặc biệt).</p>" },
    { id: 1404, title: "Sổ tay bảo hộ quyền sở hữu trí tuệ", date: "01/04/2026", summary: "Quy trình đăng ký, bảo vệ nhãn hiệu, bản quyền và các tài sản trí tuệ khác của doanh nghiệp trong bối cảnh số hóa...", thumb: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=300&q=80", attachments: [{ name: "So_Tay_SHTT.pdf", url: "#", size: "4.2 MB" }], content: "<h3>Giới thiệu về sở hữu trí tuệ</h3><p>Sở hữu trí tuệ (SHTT) là tài sản vô hình quan trọng của doanh nghiệp, bao gồm: Nhãn hiệu, Sáng chế/Giải pháp hữu ích, Kiểu dáng công nghiệp, Bản quyền tác giả, Bí mật kinh doanh.</p><h3>Đăng ký nhãn hiệu</h3><p>Quy trình đăng ký nhãn hiệu tại Cục Sở hữu trí tuệ: Nộp đơn đăng ký (01 Tờ khai + 05 mẫu nhãn + Giấy ủy quyền + Chứng từ nộp phí); Thẩm định hình thức (1-2 tháng); Công bố đơn (2 tháng); Thẩm định nội dung (9-12 tháng); Cấp Giấy chứng nhận đăng ký nhãn hiệu (thời hạn bảo hộ: 10 năm, có thể gia hạn).</p><h3>Đăng ký bản quyền tác giả</h3><p>Bản quyền phát sinh tự động từ khi tác phẩm được định hình. Tuy nhiên, việc đăng ký bản quyền tại Cục Bản quyền tác giả sẽ tạo chứng cứ pháp lý mạnh khi có tranh chấp. Hồ sơ gồm: Tờ khai, 02 bản sao tác phẩm, Giấy ủy quyền, Giấy cam đoan đồng tác giả (nếu có).</p><h3>Bảo vệ quyền SHTT</h3><p>Khi phát hiện hành vi xâm phạm, doanh nghiệp có thể: Yêu cầu chấm dứt hành vi xâm phạm; Khởi kiện dân sự đòi bồi thường; Yêu cầu cơ quan nhà nước xử lý hành chính; Khởi tố hình sự (đối với hành vi cố ý xâm phạm nghiêm trọng).</p>" },
    { id: 1405, title: "Cẩm nang pháp luật lao động 2026", date: "25/03/2026", summary: "Cập nhật những quy định mới nhất về lao động, hợp đồng, quy chế tiền lương và đóng bảo hiểm xã hội...", thumb: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=300&q=80", attachments: [{ name: "Cam_Nang_Lao_Dong.docx", url: "#", size: "2.8 MB" }], content: "<h3>Cập nhật Bộ luật Lao động 2019</h3><p>Bộ luật Lao động 2019 (có hiệu lực từ 01/01/2021) có nhiều thay đổi quan trọng: Định nghĩa mới về quấy rối tình dục tại nơi làm việc; Quy định chi tiết hơn về thỏa ước lao động tập thể; Mở rộng đối tượng áp dụng đối với người lao động nước ngoài.</p><h3>Các loại hợp đồng lao động</h3><p>Hợp đồng lao động không xác định thời hạn; Hợp đồng lao động xác định thời hạn (tối đa 36 tháng); Hợp đồng lao động theo mùa vụ/công việc (dưới 12 tháng). Lưu ý: Khi hợp đồng xác định thời hạn hết hạn, nếu người lao động tiếp tục làm việc thì trong 30 ngày phải ký hợp đồng mới.</p><h3>Quy chế tiền lương</h3><p>Doanh nghiệp phải xây dựng quy chế tiền lương, trong đó quy định: Thang lương, bảng lương; Định mức lao động; Hình thức trả lương; Thời hạn trả lương; Các khoản phụ cấp, bổ sung; Điều kiện nâng lương, hạ lương. Quy chế phải được tham vấn ý kiến tổ chức đại diện người lao động và công bố công khai.</p><h3>Bảo hiểm xã hội bắt buộc</h3><p>Tỷ lệ đóng BHXH năm 2026: Hưu trí - Tử tuất: 14% (DN 8%, NLĐ 6%); Ốm đau - Thai sản: 3% (DN đóng toàn bộ); Tai nạn lao động - Bệnh nghề nghiệp: 0.5% (DN đóng toàn bộ); BHYT: 4.5% (DN 3%, NLĐ 1.5%); BHTN: 1% (mỗi bên 0.5%).</p>" }
];

export const thongBaoData = Array.from({ length: 15 }).map((_, idx) => ({
    id: 4000 + idx,
    isNews: true,
    title: `Thông báo ${idx + 1}: ${[
        'Tổ chức tọa đàm về thủ tục pháp lý cho doanh nghiệp nhỏ và vừa',
        'Mở lớp bồi dưỡng kỹ năng pháp lý trực tuyến tháng 5/2026',
        'Cập nhật danh sách tài liệu hỗ trợ pháp lý mới nhất',
        'Tiếp nhận câu hỏi tư vấn pháp luật từ doanh nghiệp'
    ][idx % 4]}`,
    summary: "Nhằm mục đích phổ biến kiến thức và hướng dẫn các doanh nghiệp thực hiện đúng quy định pháp luật hiện hành...",
    date: `${String(28 - (idx % 28)).padStart(2, '0')}/04/2026`,
    thumb: `https://images.unsplash.com/photo-${[
        '1589829085413-56de8ae18c73',
        '1556761175-4b46a572b786',
        '1521791136064-7986c2920216',
        '1454165804606-c3d57bc86b40'
    ][idx % 4]}?auto=format&fit=crop&w=400&q=80`,
    menuKey: "hoat-dong-trung-tam",
    subKey: "thong-bao",
    attachments: idx % 3 === 0 ? [{ name: `ThongBao_So_${idx + 1}.pdf`, size: "1.2 MB" }] : [],
    content: `<h4>1. Mục đích thông báo</h4><p>Thông báo này nhằm phổ biến kiến thức và hướng dẫn các doanh nghiệp thực hiện đúng quy định pháp luật hiện hành, đồng thời cập nhật những thay đổi mới nhất trong chính sách hỗ trợ doanh nghiệp.</p><h4>2. Nội dung chính</h4><ul><li>${['Tổ chức tọa đàm về thủ tục pháp lý cho doanh nghiệp nhỏ và vừa', 'Mở lớp bồi dưỡng kỹ năng pháp lý trực tuyến tháng 5/2026', 'Cập nhật danh sách tài liệu hỗ trợ pháp lý mới nhất', 'Tiếp nhận câu hỏi tư vấn pháp luật từ doanh nghiệp'][idx % 4]}</li><li>Hướng dẫn chi tiết quy trình, thủ tục thực hiện</li><li>Thời gian, địa điểm và thành phần tham dự</li><li>Các tài liệu liên quan được đính kèm trong thông báo</li></ul><h4>3. Thời hạn thực hiện</h4><p>Đề nghị các doanh nghiệp quan tâm thực hiện đúng thời hạn quy định và báo cáo kết quả về Trung tâm trước ngày ${String(30 - idx).padStart(2, '0')}/05/2026.</p><h4>4. Liên hệ hỗ trợ</h4><p>Mọi thắc mắc xin liên hệ: Hotline 1900-xxxx hoặc email hotro@legal.gov.vn để được hướng dẫn chi tiết.</p>`
}));

export const newsData = [
    { id: 601, isNews: true, title: "Bộ Tư pháp tổ chức tọa đàm chuyên sâu về hỗ trợ pháp lý cho doanh nghiệp nhỏ và vừa", summary: "Tổng hợp tin tức, bài viết về hoạt động hướng dẫn, giải đáp và hỗ trợ pháp lý dành cho doanh nghiệp trong bối cảnh mới.", date: "12/04/2026", thumb: "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=400&q=80", field: "Pháp luật", menuKey: "hoat-dong-trung-tam", subKey: "tin-tuc-noi-bat", attachments: [{ name: "Tai_Lieu_Toa_Dam.pdf", size: "2.4 MB" }], content: "<h4>1. Mục đích và yêu cầu của tọa đàm</h4><p>Thực hiện Chỉ thị số 18/CT-TTg ngày 15/5/2025 của Thủ tướng Chính phủ về tăng cường hỗ trợ pháp lý cho doanh nghiệp nhỏ và vừa, Bộ Tư pháp tổ chức buổi tọa đàm chuyên sâu nhằm phổ biến các quy định mới về hỗ trợ pháp lý, cập nhật những thay đổi trong chính sách ưu đãi và thủ tục hành chính liên quan.</p><p>Buổi tọa đàm có sự tham gia của đại diện các Vụ, Cục thuộc Bộ Tư pháp, cùng hơn 300 đại biểu là lãnh đạo doanh nghiệp, hiệp hội ngành nghề và chuyên gia pháp lý từ 63 tỉnh, thành phố.</p><p><img src='https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=800&q=80' alt='Toa dam'/></p><h4>2. Nội dung trọng tâm</h4><ul><li><strong>Điểm mới trong Luật Hỗ trợ doanh nghiệp nhỏ và vừa (sửa đổi):</strong> Bổ sung quy định về hỗ trợ chuyển đổi số, hỗ trợ tiếp cận thị trường quốc tế, và mở rộng đối tượng hưởng ưu đãi</li><li><strong>Hướng dẫn tiếp cận các nguồn vốn ưu đãi:</strong> Giới thiệu các gói tín dụng đặc biệt từ Ngân hàng Chính sách Xã hội, Quỹ Bảo lãnh tín dụng cho DNNVV, và chương trình cho vay lãi suất thấp của các ngân hàng thương mại</li><li><strong>Quy trình giải quyết khiếu nại, kiến nghị của doanh nghiệp:</strong> Hướng dẫn chi tiết cách thức gửi đơn, thời hạn giải quyết, và cơ chế giám sát việc thực hiện</li><li><strong>Dịch vụ hỗ trợ pháp lý miễn phí:</strong> Giới thiệu mạng lưới 63 Trung tâm Hỗ trợ pháp lý cấp tỉnh và tổng đài tư vấn 1900-xxxx</li></ul><h4>3. Ý kiến phát biểu của các diễn giả</h4><p><strong>Bà Nguyễn Thị Minh Huệ - Vụ trưởng Vụ Pháp chế, Bộ Tư pháp:</strong> \"Hệ thống pháp luật hỗ trợ doanh nghiệp đã được hoàn thiện đáng kể trong 5 năm qua. Tuy nhiên, thách thức lớn nhất hiện nay là làm sao để doanh nghiệp, đặc biệt là DNNVV, tiếp cận được các chính sách này một cách hiệu quả. Chúng tôi cam kết sẽ tiếp tục đơn giản hóa thủ tục, tăng cường ứng dụng công nghệ thông tin và nâng cao chất lượng dịch vụ hỗ trợ.\"</p><h4>4. Kết luận và kiến nghị</h4><p>Sau 4 giờ làm việc nghiêm túc, buổi tọa đàm đã thu nhận được 87 ý kiến phát biểu và 156 câu hỏi từ đại biểu. Các vấn đề được quan tâm nhất bao gồm: chi phí tuân thủ pháp luật, thủ tục thuế, đăng ký sở hữu trí tuệ, và giải quyết tranh chấp thương mại.</p><p>Bộ Tư pháp sẽ tổng hợp các ý kiến để báo cáo Chính phủ, đồng thời chỉ đạo các cơ quan liên quan nghiên cứu, hoàn thiện khung pháp lý theo hướng giảm thiểu rào cản, tạo điều kiện thuận lợi nhất cho doanh nghiệp phát triển.</p>" },
    { id: 602, isNews: true, title: "Triển khai hiệu quả chương trình hỗ trợ pháp lý liên ngành tại 63 tỉnh thành", summary: "Cập nhật các hoạt động phối hợp giữa bộ, ngành và địa phương trong công tác hỗ trợ pháp lý cho doanh nghiệp nhỏ và vừa.", date: "10/04/2026", thumb: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=400&q=80", field: "Chính sách", menuKey: "hoat-dong-trung-tam", subKey: "tin-tuc-noi-bat", attachments: [{ name: "Bao_Cao_Lien_Nganh.pdf", size: "1.8 MB" }], content: "<h4>Kết quả nổi bật</h4><p>Chương trình hỗ trợ pháp lý liên ngành đã được triển khai đồng bộ tại 63 tỉnh, thành phố với sự tham gia của 12 bộ, ngành trung ương.</p><h4>Các chỉ tiêu đạt được</h4><ul><li>Tư vấn miễn phí cho hơn 15.000 doanh nghiệp</li><li>Tổ chức 245 lớp tập huấn, bồi dưỡng kiến thức pháp luật</li><li>Xây dựng 63 cổng thông tin điện tử hỗ trợ pháp lý cấp tỉnh</li></ul>" },
    { id: 603, isNews: true, title: "Khai mạc khóa đào tạo trực tuyến về quản trị rủi ro hợp đồng thương mại quốc tế", summary: "Giới thiệu nội dung đào tạo trực tuyến, bồi dưỡng kiến thức pháp lý phục vụ doanh nghiệp nhỏ và vừa xuất nhập khẩu.", date: "05/04/2026", thumb: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=400&q=80", field: "Đào tạo", menuKey: "hoat-dong-trung-tam", subKey: "tin-tuc-noi-bat", attachments: [{ name: "Lich_Dao_Tao.pdf", size: "850 KB" }], content: "<h4>Đối tượng tham gia</h4><p>Khóa đào tạo dành cho chủ doanh nghiệp, giám đốc pháp chế, trưởng phòng xuất nhập khẩu và nhân viên phụ trách hợp đồng thương mại.</p><h4>Nội dung đào tạo</h4><ul><li>Phân tích rủi ro pháp lý trong đàm phán hợp đồng</li><li>Các điều khoản bắt buộc và khuyến nghị</li><li>Cơ chế giải quyết tranh chấp theo CISG và UNCITRAL</li><li>Bảo hiểm tín dụng xuất khẩu</li></ul>" },
    { id: 604, isNews: true, title: "Hướng dẫn giải đáp thắc mắc liên quan đến thuế thu nhập doanh nghiệp năm 2026", summary: "Cơ quan thuế tổ chức buổi đối thoại trực tiếp nhằm giải quyết các vướng mắc của doanh nghiệp khi thực hiện quyết toán thuế TNDN.", date: "01/04/2026", thumb: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=400&q=80", field: "Thuế", menuKey: "hoat-dong-trung-tam", subKey: "tin-tuc-noi-bat", attachments: [{ name: "Giai_Dap_Thue.pdf", size: "3.2 MB" }], content: "<h4>Những điểm mới về thuế TNDN 2026</h4><p>Thông tư 78/2026/TT-BTC hướng dẫn một số điều mới của Luật Quản lý thuế, có hiệu lực từ 01/01/2026.</p><h4>Các nội dung được giải đáp</h4><ul><li>Chi phí được trừ và không được trừ khi tính thuế TNDN</li><li>Ưu đãi thuế đối với doanh nghiệp công nghệ cao</li><li>Thủ tục hoàn thuế GTGT cho dự án đầu tư</li><li>Xử lý hóa đơn điện tử có sai sót</li></ul>" }
];

export const suKienData = [
    { id: 701, isNews: true, title: "Tọa đàm trực tuyến: Tháo gỡ khó khăn về thủ tục đầu tư cho doanh nghiệp", summary: "Chương trình tọa đàm hỗ trợ giải đáp trực tiếp các vướng mắc của doanh nghiệp về thủ tục đầu tư dự án.", date: "15/04/2026", thumb: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=400&q=80", field: "Sự kiện", menuKey: "hoat-dong-trung-tam", subKey: "su-kien" }
];

export const hoatDongPhoiHopData = [
    { id: 801, isNews: true, title: "Phối hợp với Hiệp hội Doanh nghiệp tập huấn Luật Đất đai mới", summary: "Hoạt động phối hợp liên ngành phổ biến kiến thức pháp luật đất đai cho cộng đồng doanh nghiệp địa phương.", date: "20/04/2026", thumb: "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=400&q=80", field: "Phối hợp", menuKey: "hoat-dong-trung-tam", subKey: "hoat-dong-phoi-hop" }
];

export const boNganhData = Array.from({ length: 5 }).map((_, idx) => {
    const agencies = ['Bộ Y tế', 'Bộ Kế hoạch và Đầu tư', 'Bộ Tài chính', 'Bộ Công Thương', 'Bộ Tư pháp'];
    return {
        id: 1101 + idx, isNews: true,
        title: `Kế hoạch hỗ trợ pháp lý cho doanh nghiệp năm 2026 của ${agencies[idx % 5]}`,
        summary: "Chi tiết các hoạt động, ngân sách và phân công nhiệm vụ triển khai hỗ trợ pháp lý nhằm tháo gỡ khó khăn cho cộng đồng doanh nghiệp.",
        date: `${String(25 - (idx * 2)).padStart(2, '0')}/04/2026`,
        thumb: `https://images.unsplash.com/photo-${['1589829085413-56de8ae18c73', '1521791136064-7986c2920216', '1556761175-4b46a572b786', '1554224154-26032ffc0d07', '1507679799987-c73779587ccf'][idx % 5]}?auto=format&fit=crop&w=400&q=80`,
        field: agencies[idx % 5],
        agency: agencies[idx % 5],
        attachments: [{ name: `KeHoach_${agencies[idx % 5].replace(/[^a-zA-Z0-9]/g, '_')}_2026.pdf`, size: '2.5 MB' }],
        content: `<h4>1. Mục tiêu kế hoạch</h4><p>${agencies[idx % 5]} xây dựng kế hoạch hỗ trợ pháp lý năm 2026 với mục tiêu nâng cao nhận thức pháp luật, giảm chi phí tuân thủ, và tạo môi trường kinh doanh thuận lợi cho doanh nghiệp.</p>`
    };
});

export const diaPhuongData = Array.from({ length: 5 }).map((_, idx) => {
    const provinces = ['Hà Nội', 'TP. Hồ Chí Minh', 'Đà Nẵng', 'Hải Phòng', 'Cần Thơ'];
    return {
        id: 1601 + idx, isNews: true,
        title: `Chương trình hỗ trợ pháp lý doanh nghiệp trên địa bàn ${provinces[idx % 5]} năm 2026`,
        summary: "UBND ban hành kế hoạch chi tiết nhằm tháo gỡ vướng mắc, cải thiện môi trường đầu tư và nâng cao năng lực cạnh tranh cho doanh nghiệp địa phương.",
        date: `${String(20 - idx).padStart(2, '0')}/04/2026`,
        thumb: `https://images.unsplash.com/photo-${['1507679799987-c73779587ccf', '1556761175-4b46a572b786', '1554224154-26032ffc0d07', '1589829085413-56de8ae18c73', '1521791136064-7986c2920216'][idx % 5]}?auto=format&fit=crop&w=400&q=80`,
        field: provinces[idx % 5],
        province: provinces[idx % 5],
        attachments: [{ name: `ChuongTrinh_${provinces[idx % 5].replace(/[^a-zA-Z0-9]/g, '_')}_2026.pdf`, size: '1.8 MB' }],
        content: `<h4>1. Đặc thù địa phương</h4><p>${provinces[idx % 5]} tập trung cải thiện môi trường kinh doanh cấp tỉnh (PCI) để tháo gỡ khó khăn về thủ tục hành chính, đất đai và vốn vay cho doanh nghiệp.</p>`
    };
});

export const chuongTrinhData = Array.from({ length: 4 }).map((_, idx) => ({
    id: 1301 + idx, isNews: true,
    title: `Chương trình ${['Phổ biến pháp luật trực tuyến', 'Hỗ trợ pháp lý lưu động', 'Tư vấn pháp luật miễn phí', 'Đào tạo pháp chế doanh nghiệp'][idx]} năm 2026`,
    summary: "Chương trình được triển khai nhằm cung cấp dịch vụ hỗ trợ pháp lý chất lượng cao, miễn phí cho doanh nghiệp trên toàn quốc.",
    date: `${String(15 - idx).padStart(2, '0')}/04/2026`,
    thumb: `https://images.unsplash.com/photo-${['1589829085413-56de8ae18c73', '1556761175-4b46a572b786', '1521791136064-7986c2920216', '1454165804606-c3d57bc86b40'][idx % 4]}?auto=format&fit=crop&w=400&q=80`,
    content: `<h4>Mục tiêu chương trình</h4><p>Chương trình hướng đến việc cung cấp dịch vụ hỗ trợ pháp lý toàn diện, giúp doanh nghiệp phòng ngừa rủi ro và phát triển bền vững.</p>`
}));

export const vanBanChinhSachMoiData = Array.from({ length: 5 }).map((_, idx) => ({
    id: 3000 + idx,
    isNews: true,
    title: `Văn bản chính sách mới ban hành: Hướng dẫn chi tiết thực hiện thủ tục số ${idx + 1}`,
    summary: "Phổ biến nội dung các chính sách mới nhất nhằm tạo hành lang pháp lý thuận lợi, tháo gỡ vướng mắc cho các doanh nghiệp.",
    date: `${String(30 - idx).padStart(2, '0')}/04/2026`,
    thumb: `https://images.unsplash.com/photo-${['1589829085413-56de8ae18c73', '1556761175-4b46a572b786', '1521791136064-7986c2920216'][idx % 3]}?auto=format&fit=crop&w=400&q=80`,
    field: ['Pháp luật', 'Doanh nghiệp', 'Thuế', 'Đầu tư'][idx % 4],
    attachments: [{ name: `VanBanChinhSach_Thang4_${idx + 1}.pdf`, size: '2.1 MB' }],
    content: `<h4>Nội dung văn bản</h4><p>Văn bản quy định chi tiết về trình tự, thủ tục, hồ sơ và thời gian giải quyết đối với các thủ tục hành chính mới.</p>`
}));

export const vanBanPhapLuatData = Array.from({ length: 15 }).map((_, idx) => {
    const types = ["Luật", "Nghị định", "Thông tư", "Quyết định"];
    const agencies = ["Quốc hội", "Chính phủ", "Bộ Tài chính", "Bộ Tư pháp"];
    const fields = ["Doanh nghiệp", "Thuế", "Lao động", "Thương mại"];

    return {
        id: 2000 + idx,
        soHieu: `${String(idx + 1).padStart(2, '0')}/2024/${types[idx % 4] === 'Luật' ? 'QH15' : 'NĐ-CP'}`,
        tieuDe: `Văn bản quy phạm pháp luật mẫu số ${idx + 1} về hướng dẫn thi hành các chính sách mới nhằm tháo gỡ khó khăn cho cơ sở sản xuất kinh doanh`,
        linhVuc: fields[idx % 4],
        loaiVanBan: types[idx % 4],
        coQuanBanHanh: agencies[idx % 4],
        ngayKy: `${String((idx % 28) + 1).padStart(2, '0')}/03/2024`,
        ngayHieuLuc: `${String((idx % 28) + 1).padStart(2, '0')}/07/2024`,
        tinhTrang: idx % 5 === 0 ? 0 : (idx % 7 === 0 ? 2 : 1),
        nguoiKy: "Chủ tịch / Bộ trưởng",
        noiDung: `<h2 style="text-align:center; font-weight:bold; margin-top:30px; margin-bottom:20px;">CHƯƠNG I: QUY ĐỊNH CHUNG</h2><p style="font-weight:bold;">Điều 1. Phạm vi điều chỉnh</p><p style="margin-bottom:15px; text-indent: 20px;">Văn bản này quy định chi tiết về các biện pháp hỗ trợ, quản lý và giám sát hoạt động của các doanh nghiệp vừa và nhỏ trên phạm vi toàn quốc.</p>`,
        fileDinhKem: [{ name: `VBPL_2024_${idx + 1}.pdf`, size: '1.5 MB' }]
    };
});

export const mediaData = [
    {
        id: 301,
        type: 'video',
        isNews: true,
        title: "Video: Hướng dẫn đăng ký kinh doanh qua mạng điện tử năm 2026",
        date: "12/04/2026",
        thumb: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800",
        summary: "Chi tiết các bước đăng ký doanh nghiệp trực tuyến trên Cổng dịch vụ công Quốc gia.",
        field: "Doanh nghiệp",
        duration: "15:30",
        content: "<h4>Tổng quan về đăng ký kinh doanh điện tử</h4><p>Theo Nghị định 01/2021/NĐ-CP, doanh nghiệp có thể đăng ký thành lập hoàn toàn trực tuyến.</p>"
    },
    {
        id: 302,
        type: 'video',
        isNews: true,
        title: "Tọa đàm: Tháo gỡ vướng mắc pháp lý cho Start-up công nghệ",
        date: "05/04/2026",
        thumb: "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&q=80&w=800",
        summary: "Thảo luận cùng chuyên gia về cách giải quyết những khó khăn pháp lý thường gặp ở giai đoạn đầu khởi nghiệp.",
        field: "Doanh nghiệp",
        duration: "45:20",
        content: "<h4>Những vướng mắc thường gặp</h4><p>Start-up công nghệ thường gặp khó khăn về sở hữu trí tuệ và gọi vốn.</p>"
    },
    {
        id: 401,
        type: 'longform',
        isNews: true,
        title: "Toàn cảnh: Bức tranh pháp lý đối với thương mại điện tử xuyên biên giới",
        date: "15/04/2026",
        thumb: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=400",
        summary: "Phân tích chuyên sâu về hệ thống văn bản quy phạm pháp luật áp dụng cho các giao dịch TMĐT vượt biên giới.",
        field: "Thương mại",
        menuKey: "hoat-dong-trung-tam",
        subKey: "multimedia",
        content: "<h4>Khung pháp lý về TMĐT xuyên biên giới</h4><p>Các giao dịch TMĐT xuyên biên giới chịu sự điều chỉnh của nhiều văn bản pháp luật hiện hành.</p>"
    },
    {
        id: 402,
        type: 'longform',
        isNews: true,
        title: "Từ A-Z: Hướng dẫn doanh nghiệp SME tiếp cận các quỹ hỗ trợ",
        date: "12/04/2026",
        thumb: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=400",
        summary: "Bài viết tổng hợp đầy đủ các kênh vay vốn, điều kiện hồ sơ pháp lý cần có.",
        field: "Doanh nghiệp",
        menuKey: "hoat-dong-trung-tam",
        subKey: "multimedia",
        content: "<h4>Các quỹ hỗ trợ doanh nghiệp SME</h4><p>Quỹ phát triển doanh nghiệp nhỏ và vừa, cùng nhiều quỹ tín dụng ưu đãi khác.</p>"
    }
];

export const videoData = mediaData.filter(item => item.type === 'video');

export const advisorsData = [
    {
        id: 1,
        name: "Nguyễn Văn Minh",
        field: "Tất cả",
        org: "Đoàn Luật sư Hà Nội",
        exp: "15 năm",
        phone: "0904.123.456",
        email: "nguyenminh@lawfirm.vn",
        province: "Hà Nội",
        diaChiLamViec: "Tầng 5, Tòa nhà Luật khoa, 35 Nguyễn Huệ, Quận 1, Hà Nội",
        chucDanh: "Trưởng phòng Tư vấn",
        trinhDo: "Tiến sĩ Luật học, Đại học Quốc gia Hà Nội (2008)",
        chungChiBangCap: "Chứng chỉ Luật sư (2009), Chứng chỉ Trọng tài viên VIAC (2012)",
        kinhNghiem: "• Luật sư thành viên Đoàn Luật sư Hà Nội (2009 - nay)\n• Tư vấn chính cho 50+ dự án FDI tổng vốn 500 triệu USD",
        ghiChu: "Nhận tư vấn các vụ việc phức tạp về doanh nghiệp, đầu tư, M&A.",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
        degree: "Tiến sĩ Luật học, Đại học Quốc gia Hà Nội (2008)",
        certificates: "Chứng chỉ Luật sư (2009), Chứng chỉ Trọng tài viên VIAC (2012)",
        experience: "• Luật sư thành viên Đoàn Luật sư Hà Nội (2009 - nay)\n• Tư vấn chính cho 50+ dự án FDI",
        rating: 4.8,
        reviews: []
    },
    {
        id: 2,
        name: "Trần Thị Hương",
        field: "Lao động & BHXH",
        org: "Công ty Luật TNHH ABC",
        exp: "12 năm",
        phone: "0912.345.678",
        email: "tranhuong@abclaw.vn",
        province: "Hà Nội",
        diaChiLamViec: "123 Nguyễn Huệ, Quận 1, Hà Nội",
        chucDanh: "Phó phòng Tư vấn",
        trinhDo: "Thạc sĩ Luật Lao động, Đại học Luật Hà Nội (2012)",
        chungChiBangCap: "Chứng chỉ Luật sư (2013), Chứng chỉ Hòa giải viên Lao động (2014)",
        kinhNghiem: "• Luật sư Công ty Luật ABC (2013 - nay)\n• Tư vấn chính sách nhân sự cho 100+ doanh nghiệp",
        ghiChu: "-",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
        degree: "Thạc sĩ Luật Lao động, Đại học Luật Hà Nội (2012)",
        certificates: "Chứng chỉ Luật sư (2013)",
        experience: "• Luật sư Công ty Luật ABC (2013 - nay)",
        rating: 4.7,
        reviews: []
    }
];

export const orgData = [
    {
        id: 1,
        name: "Công ty Luật TNHH ABC",
        field: "Doanh nghiệp, Đầu tư, M&A",
        address: "Tầng 12, Tòa nhà ABC, 123 Nguyễn Huệ, Quận 1, TP.HCM",
        phone: "028.3827.1234",
        email: "info@abclaw.vn",
        province: "TP. Hồ Chí Minh",
        logo: "https://placehold.co/120x80/2580f0/ffffff?text=ABC+Law",
        caNhanThuocToChuc: "<ul class='list-disc pl-5 space-y-1'><li>Luật sư Nguyễn Văn An - Chủ tịch HĐTV</li><li>Luật sư Trần Thị Mai - Phó Tổng Giám gốc</li></ul>",
        chungChiBangCap: "Giấy phép thành lập số 0123456789 do Sở KH&ĐT TP.HCM cấp ngày 15/06/2010.",
        kinhNghiem: "• Thành lập từ 2010, hơn 15 năm kinh nghiệm\n• Tư vấn cho 500+ doanh nghiệp",
        ghiChu: "Chuyên tư vấn cho doanh nghiệp FDI, tập đoàn đa quốc gia."
    }
];

export const consultationHistoryData = [
    {
        id: 1,
        date: "15/04/2026",
        time: "14:30",
        advisor: "Luật sư Nguyễn Văn Minh",
        field: "Doanh nghiệp & Đầu tư",
        method: "Trực tiếp",
        status: "completed",
        question: "Thủ tục chuyển đổi từ công ty TNHH 1 thành viên sang công ty cổ phần",
        answer: "Hồ sơ chuyển đổi bao gồm: Quyết định của chủ sở hữu, Nghị quyết ĐHCĐ, Điều lệ công ty cổ phần, Danh sách cổ đông sáng lập. Thời gian thực hiện: 05-07 ngày làm việc.",
        rating: 5
    }
];

export const vuViecDienHinhData = [
    {
        id: 1,
        title: "Tranh chấp hợp đồng mua bán hàng hóa quốc tế",
        field: "Thương mại",
        date: "15/04/2026",
        views: 1250,
        shortAnswer: "Kiểm tra điều khoản luật áp dụng, thu thập chứng từ kiểm dịch, gửi công văn đòi nợ. Nếu không thành công, khởi kiện tại VIAC.",
        summary: "Doanh nghiệp Việt Nam ký hợp đồng xuất khẩu gạo với đối tác Philippines. Sau khi giao hàng, bên mua không thanh toán với lý do chất lượng không đạt. Doanh nghiệp cần tư vấn về thủ tục khởi kiện.",
        content: "Tình huống: Công ty A (Việt Nam) ký hợp đồng xuất khẩu 5.000 tấn gạo cho công ty B (Philippines). Bên mua chậm thanh toán.",
        resolution: "Giải pháp: Gửi công văn đòi nợ chính thức, chuẩn bị hồ sơ trọng tài.",
        outcome: "Kết quả: Thắng kiện tại VIAC, thu hồi công nợ.",
        attachments: [{ name: "Mau_Don_Khoi_Kien_VIAC.pdf", url: "#", size: "245 KB" }]
    }
];

export const resources = [
    "Sổ tay hỗ trợ pháp lý cho doanh nghiệp nhỏ và vừa",
    "Bộ biểu mẫu thủ tục pháp lý cơ bản",
    "Cẩm nang thực hiện hợp đồng thương mại",
    "Hướng dẫn xử lý tình huống pháp lý thường gặp"
];

export const contactData = {
    title: "LIÊN HỆ TRUNG TÂM HỖ TRỢ PHÁP LÝ DOANH NGHIỆP NHỎ VÀ VỪA",
    date: "13/04/2026",
    address: "58 - 60 Trần Phú - Ba Đình - Hà Nội",
    phone: "024.6271.7579",
    director: "Trần Minh Sơn",
    email: "tthtpldn@moj.gov.vn",
    attachments: [
        { name: "Danh_ba_dien_thoai_Trung_tam_2026.pdf", url: "#" },
        { name: "Quy_che_tiep_nhan_ho_tro.docx", url: "#" }
    ]
};

export const orgChartData = {
    title: "CƠ CẤU TỔ CHỨC TRUNG TÂM HỖ TRỢ PHÁP LÝ CHO DOANH NGHIỆP NHỎ VÀ VỪA",
    date: "13/04/2026",
    attachments: [
        { name: "SoDo_CoCauToChuc_2026.pdf", url: "#" }
    ],
    nodes: {
        director: "GIÁM ĐỐC",
        viceDirectors: [
            "PHÓ GIÁM ĐỐC",
            "PHÓ GIÁM ĐỐC"
        ],
        departments: [
            "Bộ phận Hành chính - Tổng hợp",
            "Bộ phận Tư vấn pháp luật và hỗ trợ giải quyết tranh chấp",
            "Bộ phận hỗ trợ pháp lý liên ngành",
            "Bộ phận bồi dưỡng, tập huấn nghiệp vụ pháp luật"
        ]
    }
};

export const lienNganhData = {
    title: "CHƯƠNG TRÌNH HỖ TRỢ PHÁP LÝ LIÊN NGÀNH",
    publishDate: "13/04/2026",
    updateFrequency: "Định kỳ hàng tháng",
    intro: "Chương trình HTPL liên ngành là hoạt động phối hợp giữa Trung tâm HTPLDN với các cơ quan nhà nước nhằm cung cấp dịch vụ pháp lý toàn diện, miễn phí cho doanh nghiệp vừa và nhỏ.",
    programs: [
        {
            icon: "🏢",
            title: "Tư vấn pháp lý",
            desc: "Cung cấp dịch vụ tư vấn pháp lý miễn phí cho doanh nghiệp.",
            details: ["Thời gian: <strong>Thứ 6 hàng tuần</strong>", "Địa điểm: <strong>Tại trụ sở Trung tâm</strong>"],
            ctaText: "Đăng ký ngay"
        },
        {
            icon: "📝",
            title: "Soạn thảo văn bản",
            desc: "Hỗ trợ doanh nghiệp trong việc thiết lập văn bản.",
            details: ["Hồ sơ thành lập DN", "Hợp đồng kinh doanh"],
            ctaText: "Đăng ký ngay"
        }
    ],
    attachments: [
        { name: "ChuongTrinhHTPL_LienNganh.pdf", url: "#" }
    ]
};

export const functionDutyData = {
    title: "Chức năng nhiệm vụ",
    date: "10/01/2026",
    attachments: [
        { name: "Nghi_dinh_09_2026_ND_CP.pdf", url: "#" }
    ],
    content: {
        intro: "Nghị định số 09/2026/NĐ-CP ngày 10 tháng 01 năm 2026 của Chính phủ quy định chức năng, nhiệm vụ, quyền hạn và cơ cấu tổ chức của Bộ Tư pháp như sau:",
        sections: [
            {
                heading: "Vị trí và chức năng",
                text: "Bộ Tư pháp là cơ quan của Chính phủ, thực hiện chức năng quản lý nhà nước về: Xây dựng pháp luật; tổ chức thi hành pháp luật; thi hành án dân sự..."
            }
        ]
    }
};

export const policyDocs = vanBanChinhSachMoiData;

export const faqs = [
    { id: 1, question: "Thủ tục đăng ký kinh doanh cần chuẩn bị những gì?", answer: "Doanh nghiệp cần chuẩn bị Điều lệ, Giấy đề nghị ĐKKD, Danh sách thành viên và giấy tờ pháp lý cá nhân.", field: "Doanh nghiệp", date: "12/04/2026" },
    { id: 2, question: "Làm thế nào để được miễn giảm thuế TNDN?", answer: "Doanh nghiệp thuộc lĩnh vực, địa bàn ưu đãi hoặc công nghệ cao có thể nộp hồ sơ hưởng ưu đãi thuế TNDN.", field: "Thuế", date: "10/04/2026" }
];

export const keHoachDaoTaoData = [
    { id: 1201, title: "Kế hoạch tập huấn Luật Doanh nghiệp mới năm 2026", date: "15/04/2026", thoiGian: "Quý II/2026", nganSach: "200 triệu đồng", nguonLuc: "Sở Tư pháp phối hợp chuyên gia đầu ngành", summary: "Kế hoạch chi tiết bồi dưỡng kiến thức pháp luật doanh nghiệp...", content: "<h4>Mục đích</h4><p>Phổ biến kịp thời các điểm mới của Luật Doanh nghiệp đến doanh nghiệp nhỏ và vừa.</p>", attachments: [{ name: "KeHoachTapHuan_LuatDN_2026.pdf", url: "#" }] }
];

export const khoaHocData = [
    { id: 1301, title: "Khóa học: Quản trị rủi ro pháp lý hợp đồng thương mại", date: "12/04/2026", thoiGian: "05/05/2026 - 15/05/2026", hinhThuc: "Trực tuyến qua Zoom", diaDiem: "Nền tảng Zoom Meeting", soLuong: "100 học viên", doiTuong: "Lãnh đạo doanh nghiệp, cán bộ pháp chế", chuongTrinh: "Phần 1: Nhận diện rủi ro\nPhần 2: Kỹ năng soạn thảo hợp đồng", summary: "Khóa học trang bị các kiến thức thiết thực về rà soát, đàm phán hợp đồng...", content: "<h4>Nội dung khóa học</h4><p>Chi tiết chương trình đào tạo trực tuyến về quản trị rủi ro hợp đồng.</p>", attachments: [{ name: "ChuongTrinhKhoaHoc_HopDong.pdf", url: "#" }] }
];

export const hoiDapData = faqs;

export const tuVanChuyenSauData = [
    {
        id: 1510,
        title: "Tư vấn thành lập quỹ đầu tư tư nhân theo Luật Chứng khoán 2025",
        content: "Điều kiện thành lập quỹ đầu tư tư nhân: (1) Vốn điều lệ tối thiểu 50 tỷ đồng; (2) Công ty quản lý quỹ có vốn 25 tỷ đồng; (3) Ngân hàng giám sát độc lập. Đối tượng đầu tư: Tối đa 30 nhà đầu tư chuyên nghiệp.",
        date: "10/04/2026",
        field: "Tài chính - Chứng khoán",
        advisor: "LS. Đặng Minh Tuấn",
        advisorComment: "Tư vấn chi tiết bởi LS. Đặng Minh Tuấn.",
        attachments: [],
        menuKey: "tu-van-phap-luat",
        subKey: "tu-van-chuyen-sau"
    }
];

export const nghienCuuData = [
    { id: 501, isNews: true, title: "Bài viết chuyên gia: Phân tích các rủi ro pháp lý trong hợp đồng lao động điện tử", summary: "Chuyên gia pháp luật phân tích sâu về tính pháp lý và các tranh chấp thường gặp đối với HĐLĐ điện tử.", date: "14/04/2026", thumb: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=400", field: "Lao động", content: "<h4>1. Giá trị pháp lý của HĐLĐ điện tử</h4><p>Hợp đồng lao động điện tử có giá trị như hợp đồng bằng văn bản truyền thống.</p>" }
];

export const tongQuanData = [
    { id: 1201, title: "Tổng quan chương trình hỗ trợ pháp lý doanh nghiệp nhỏ và vừa giai đoạn 2026-2030", summary: "Tóm tắt mục tiêu, nhiệm vụ trọng tâm và lộ trình thực hiện chương trình hỗ trợ pháp lý toàn quốc.", date: "15/04/2026", thumb: "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=400", field: "Chính sách", content: "<h4>Chương trình hỗ trợ pháp lý 2026-2030</h4><p>Lộ trình hướng tới cung cấp dịch vụ pháp lý số tích hợp trí tuệ nhân tạo.</p>" }
];

export const contentBySubPage = {
    "gioi-thieu-chung": [
        { id: 1, title: "Giới thiệu chung về chuyên trang hỗ trợ pháp lý doanh nghiệp", summary: "Khái quát mục tiêu, phạm vi cung cấp thông tin và vai trò của chuyên trang...", date: "06/04/2026", attachments: [{ name: "GioiThieuChung.pdf", url: "#" }] }
    ],
    "tin-tuc-noi-bat": newsData,
    "thong-bao": thongBaoData,
    "su-kien": suKienData,
    "hoat-dong-phoi-hop": hoatDongPhoiHopData,
    "multimedia": mediaData,
    "bai-giang-truc-tuyen": videoData,
    "bai-viet-chuyen-gia": nghienCuuData,
    "phong-van": nghienCuuData,
    "nghien-cuu-trao-doi-chi-tiet": nghienCuuData,
    "kinh-nghiem-thuc-tien": nghienCuuData,
    "tong-quan-chuong-trinh": tongQuanData,
    "chuong-trinh-bo-nganh": boNganhData,
    "chuong-trinh-dia-phuong": diaPhuongData,
    "van-ban-moi-ban-hanh": vanBanChinhSachMoiData,
    "van-ban-phap-luat": vanBanPhapLuatData,
    "tai-lieu-boi-duong": bieuMauData,
    "bieu-mau-hop-dong": bieuMauData,
    "tai-lieu-htpl": taiLieuHTPLData,
    "longform": mediaData,
    "ke-hoach-dao-tao": keHoachDaoTaoData,
    "khoa-hoc": khoaHocData,
    "hoi-dap-phap-luat": hoiDapData,
    "tu-van-chuyen-sau": tuVanChuyenSauData,
    "mang-luoi-tu-van-vien": { advisors: advisorsData, organizations: orgData },
    "vu-viec-dien-hinh": vuViecDienHinhData
};

// Dữ liệu mẫu cơ cấu tổ chức Trợ giúp pháp lý - Cổng Pháp luật tỉnh Lào Cai (lao-cai-v2)
// Cùng tên export và cấu trúc đối tượng với src/data/mockCoCauToChuc.js (dùng chung cho Cổng quốc gia, không sửa file đó).
export const MOCK_ORG_UNITS = [
    {
        id: '1',
        maDonVi: 'TT.10.01',
        tenDonVi: 'Trung tâm Trợ giúp pháp lý Nhà nước tỉnh Lào Cai',
        donViChuQuan: 'SỞ TƯ PHÁP TỈNH LÀO CAI',
        nguoiDaiDien: 'Hoàng Văn Thắng',
        diaChi: 'Số 1B Hoàng Liên, phường Nam Cường, tỉnh Lào Cai',
        thoiGianHieuLuc: '01/07/2025 - —',
        soLuongCanBo: '18',
        children: [
            {
                id: '1-1',
                maDonVi: 'TT.10.01.02',
                tenDonVi: 'Phòng Nghiệp vụ',
                donViChuQuan: 'Trung tâm Trợ giúp pháp lý Nhà nước tỉnh Lào Cai',
                nguoiDaiDien: 'Nguyễn Thị Hồng Nhung',
                diaChi: 'Số 1B Hoàng Liên, phường Nam Cường, tỉnh Lào Cai',
                thoiGianHieuLuc: '01/07/2025 - —',
                soLuongCanBo: '7',
                children: [
                    {
                        id: '1-1-1',
                        maDonVi: 'TT.10.01.02.01',
                        tenDonVi: 'Tổ Trợ giúp pháp lý lưu động vùng cao, biên giới',
                        donViChuQuan: 'Phòng Nghiệp vụ',
                        nguoiDaiDien: 'Lò Văn Thành',
                        diaChi: 'Số 1B Hoàng Liên, phường Nam Cường, tỉnh Lào Cai',
                        thoiGianHieuLuc: '01/08/2025 - —',
                        soLuongCanBo: '4',
                        children: [
                            {
                                id: '1-1-1-1',
                                maDonVi: 'TT.10.01.02.01.01',
                                tenDonVi: 'Nhóm Trợ giúp pháp lý lưu động xã Y Tý - Bát Xát',
                                donViChuQuan: 'Tổ Trợ giúp pháp lý lưu động vùng cao, biên giới',
                                nguoiDaiDien: '—',
                                diaChi: '—',
                                thoiGianHieuLuc: '01/08/2025 - —',
                                soLuongCanBo: '2',
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        id: '2',
        maDonVi: 'TT.10.01.01',
        tenDonVi: 'Phòng Hành chính - Tổng hợp',
        donViChuQuan: 'Trung tâm Trợ giúp pháp lý Nhà nước tỉnh Lào Cai',
        nguoiDaiDien: 'Phạm Thị Thu Hà',
        diaChi: 'Số 1B Hoàng Liên, phường Nam Cường, tỉnh Lào Cai',
        thoiGianHieuLuc: '01/07/2025 - —',
        soLuongCanBo: '4',
    },
    {
        id: '3',
        maDonVi: 'CN.10.01.01',
        tenDonVi: 'Chi nhánh Trợ giúp pháp lý số 1 (phường Cốc Lếu)',
        donViChuQuan: 'Trung tâm Trợ giúp pháp lý Nhà nước tỉnh Lào Cai',
        nguoiDaiDien: 'Vàng Seo Chứ',
        diaChi: 'Số 145 đường Nguyễn Huệ, phường Cốc Lếu, tỉnh Lào Cai',
        thoiGianHieuLuc: '01/07/2025 - —',
        soLuongCanBo: '2',
    },
    {
        id: '4',
        maDonVi: 'CN.10.01.02',
        tenDonVi: 'Chi nhánh Trợ giúp pháp lý số 2 (phường Sa Pa)',
        donViChuQuan: 'Trung tâm Trợ giúp pháp lý Nhà nước tỉnh Lào Cai',
        nguoiDaiDien: 'Giàng Thị Mai',
        diaChi: 'Số 12 đường Điện Biên, phường Sa Pa, tỉnh Lào Cai',
        thoiGianHieuLuc: '01/07/2025 - —',
        soLuongCanBo: '2',
    },
    {
        id: '5',
        maDonVi: 'CN.10.01.03',
        tenDonVi: 'Chi nhánh Trợ giúp pháp lý số 3 (xã Bảo Thắng)',
        donViChuQuan: 'Trung tâm Trợ giúp pháp lý Nhà nước tỉnh Lào Cai',
        nguoiDaiDien: 'Đỗ Minh Tuấn',
        diaChi: 'Số 89 đường Nguyễn Tất Thành, xã Bảo Thắng, tỉnh Lào Cai',
        thoiGianHieuLuc: '01/07/2025 - —',
        soLuongCanBo: '2',
    },
    {
        id: '6',
        maDonVi: 'TT.10.01.03',
        tenDonVi: 'Tổ tiếp nhận yêu cầu TGPL tại Trung tâm Phục vụ hành chính công tỉnh',
        donViChuQuan: 'Trung tâm Trợ giúp pháp lý Nhà nước tỉnh Lào Cai',
        nguoiDaiDien: '—',
        diaChi: 'Trung tâm Phục vụ hành chính công tỉnh Lào Cai',
        thoiGianHieuLuc: '01/07/2025 - —',
        soLuongCanBo: '—',
    },
    {
        id: '7',
        maDonVi: 'CN.10.01.04',
        tenDonVi: 'Chi nhánh Trợ giúp pháp lý số 4 (xã Bát Xát)',
        donViChuQuan: 'Trung tâm Trợ giúp pháp lý Nhà nước tỉnh Lào Cai',
        trangThai: 'Đang hoạt động',
        ngayThanhLap: '1/7/2025',
        soQuyetDinh: '1586/QĐ-UBND',
        fileQuyetDinh: 'Chưa cập nhật',
        nguoiDaiDien: 'Hà Văn Quyết',
        soLuongNhanSu: 3,
        soLuongTroGiupVien: 2,
        soDienThoai: '0214.3883.210',
        email: 'cn4.tgpl@laocai.gov.vn',
        website: 'https://sotuphap.laocai.gov.vn',
        diaChi: 'Số 23 đường Hùng Vương, xã Bát Xát, tỉnh Lào Cai',
        ghiChu: 'Phụ trách cụm Bát Xát - Tả Van - Phong Niên - Gia Phú - Bản Lầu - Y Tý',
        thoiGianHieuLuc: '01/07/2025 - —',
        soLuongCanBo: '3',
    }
];

export const MOCK_ORG_MEMBERS = [
    { id: '1', maCanBo: 'TGV.LC.001', tenCanBo: 'Hoàng Văn Thắng', chucVu: 'Giám đốc', sdt: '0214.3824.163', email: 'thanghv.stp@laocai.gov.vn' },
    { id: '2', maCanBo: 'TGV.LC.002', tenCanBo: 'Trần Thị Minh Phương', chucVu: 'Phó Giám đốc', sdt: '0214.3824.166', email: 'phuongttm.stp@laocai.gov.vn' },
    { id: '3', maCanBo: 'TGV.LC.003', tenCanBo: 'Nguyễn Thị Hồng Nhung', chucVu: 'Trưởng phòng', sdt: '0915.236.418', email: 'nhungnth.stp@laocai.gov.vn' },
    { id: '4', maCanBo: 'TGV.LC.004', tenCanBo: 'Lò Văn Thành', chucVu: 'Trợ giúp viên', sdt: '0988.417.305', email: 'thanhlv.stp@laocai.gov.vn' },
    { id: '5', maCanBo: 'TGV.LC.005', tenCanBo: 'Giàng Thị Mai', chucVu: 'Trợ giúp viên', sdt: '0376.524.190', email: 'maigt.stp@laocai.gov.vn' },
    { id: '6', maCanBo: 'TGV.LC.006', tenCanBo: 'Phạm Thị Thu Hà', chucVu: 'Kế toán', sdt: '0912.608.274', email: 'hapt.stp@laocai.gov.vn' },
    { id: '7', maCanBo: 'TGV.LC.007', tenCanBo: 'Vàng Seo Chứ', chucVu: 'Trợ giúp viên', sdt: '0869.351.027', email: 'chuvs.stp@laocai.gov.vn' },
    { id: '8', maCanBo: 'TGV.LC.008', tenCanBo: 'Đỗ Minh Tuấn', chucVu: 'Cán bộ pháp lý', sdt: '0948.172.563', email: 'tuandm.stp@laocai.gov.vn' },
];

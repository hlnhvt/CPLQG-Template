export const MOCK_ORG_UNITS = [
    {
        id: '1',
        maDonVi: 'STP.15.02',
        tenDonVi: 'Sở TP Yên bái',
        donViChuQuan: 'CỤC TRỢ GIÚP PHÁP LÝ',
        nguoiDaiDien: '—',
        diaChi: '19',
        thoiGianHieuLuc: '01/04/2026 - —',
        soLuongCanBo: '6',
        children: [
            {
                id: '1-1',
                maDonVi: 'TT.15.03',
                tenDonVi: 'Trung tâm số 1 Yên bái',
                donViChuQuan: 'Sở TP Yên bái',
                nguoiDaiDien: '—',
                diaChi: '19',
                thoiGianHieuLuc: '01/05/2026 - —',
                soLuongCanBo: '1',
                children: [
                    {
                        id: '1-1-1',
                        maDonVi: 'CN.15.03.01',
                        tenDonVi: 'CN yên bái 1',
                        donViChuQuan: 'Trung tâm số 1 Yên bái',
                        nguoiDaiDien: '—',
                        diaChi: '19',
                        thoiGianHieuLuc: '01/05/2026 - —',
                        soLuongCanBo: '1',
                        children: [
                            {
                                id: '1-1-1-1',
                                maDonVi: 'CN.15.03.01.01',
                                tenDonVi: 'PB CN yên bái 1',
                                donViChuQuan: 'CN yên bái 1',
                                nguoiDaiDien: '—',
                                diaChi: '—',
                                thoiGianHieuLuc: '01/05/2026 - —',
                                soLuongCanBo: '1',
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        id: '2',
        maDonVi: 'CN.15.04.01',
        tenDonVi: 'CN Yên bái 2',
        donViChuQuan: 'Trung tâm số 2 Yên bái',
        nguoiDaiDien: '—',
        diaChi: '13',
        thoiGianHieuLuc: '01/05/2026 - —',
        soLuongCanBo: '2',
    },
    {
        id: '3',
        maDonVi: 'CN.46.02.01',
        tenDonVi: 'CN thuộc TT2 Huế',
        donViChuQuan: 'TT số 2 TP Huế',
        nguoiDaiDien: '—',
        diaChi: '5',
        thoiGianHieuLuc: '30/04/2026 - —',
        soLuongCanBo: '—',
    },
    {
        id: '4',
        maDonVi: 'CN.25.07.01',
        tenDonVi: 'CN thuộc Trung tâm Phú thọ',
        donViChuQuan: 'Trung tâm Phú thọ',
        nguoiDaiDien: '—',
        diaChi: '1',
        thoiGianHieuLuc: '28/04/2026 - —',
        soLuongCanBo: '—',
    },
    {
        id: '5',
        maDonVi: 'CN.79.01.02',
        tenDonVi: 'CN TGPL SG 1.2',
        donViChuQuan: 'TT TGPL SG 1',
        nguoiDaiDien: '—',
        diaChi: '1',
        thoiGianHieuLuc: '01/05/2026 - 08/05/2026',
        soLuongCanBo: '—',
    },
    {
        id: '6',
        maDonVi: 'TT.15.01.02',
        tenDonVi: 'Phòng số 2 TT số 1',
        donViChuQuan: 'Trung tâm số 1',
        nguoiDaiDien: '—',
        diaChi: 'Số 20',
        thoiGianHieuLuc: '01/04/2026 - 01/05/2030',
        soLuongCanBo: '—',
    },
    {
        id: '7',
        maDonVi: 'CN.79.01.01.01',
        tenDonVi: 'CN TGPL SG 1.1',
        donViChuQuan: 'TT TGPL SG 1',
        trangThai: 'Đang hoạt động',
        ngayThanhLap: '1/4/2026',
        soQuyetDinh: '222',
        fileQuyetDinh: 'Chưa cập nhật',
        nguoiDaiDien: 'Chưa có',
        soLuongNhanSu: 3,
        soLuongTroGiupVien: 3,
        soDienThoai: '01112222222',
        email: 'Chưa cập nhật',
        website: 'Chưa cập nhật',
        diaChi: '11',
        ghiChu: 'Chưa có thông tin',
        thoiGianHieuLuc: '01/04/2026 - —',
        soLuongCanBo: '3',
    }
];

export const MOCK_ORG_MEMBERS = [
    { id: '1', maCanBo: 'BC260409040335', tenCanBo: 'Nguyễn An Nghi', chucVu: 'Trưởng phòng', sdt: '02222222222', email: 'nghian@gmail.com' },
    { id: '2', maCanBo: 'BC260423081323', tenCanBo: 'Trần Văn Tú', chucVu: 'Trợ giúp viên', sdt: '03333333333', email: 'tutv@gmail.com' },
    { id: '3', maCanBo: 'BC260423081601', tenCanBo: 'Lê Thị Mai', chucVu: 'Trợ giúp viên', sdt: '04444444444', email: 'mait@gmail.com' },
    { id: '4', maCanBo: 'BC260423081700', tenCanBo: 'Phạm Hồng Thái', chucVu: 'Cán bộ', sdt: '05555555555', email: 'thaiph@gmail.com' },
    { id: '5', maCanBo: 'BC260423081800', tenCanBo: 'Hoàng Kim Liên', chucVu: 'Kế toán', sdt: '06666666666', email: 'lienhk@gmail.com' },
    { id: '6', maCanBo: 'BC260423081900', tenCanBo: 'Đỗ Văn Hùng', chucVu: 'Cán bộ kỹ thuật', sdt: '07777777777', email: 'hungdv@gmail.com' },
    { id: '7', maCanBo: 'BC260423082000', tenCanBo: 'Ngô Thị Lan', chucVu: 'Trợ giúp viên', sdt: '08888888888', email: 'lannt@gmail.com' },
    { id: '8', maCanBo: 'BC260423082100', tenCanBo: 'Vũ Minh Tuấn', chucVu: 'Cán bộ pháp lý', sdt: '09999999999', email: 'tuanvm@gmail.com' },
];

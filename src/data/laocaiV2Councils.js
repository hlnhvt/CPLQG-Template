// Hội đồng phối hợp phổ biến, giáo dục pháp luật trên địa bàn tỉnh Lào Cai (Cổng Lào Cai v2). Dữ liệu mẫu.
// Thành viên, Tổ thư ký chỉ ghi chức danh, không ghi tên người.

const PROVINCE_MEMBERS = [
    ['Lãnh đạo UBND tỉnh Lào Cai', 'Chủ tịch Hội đồng'],
    ['Giám đốc Sở Tư pháp', 'Phó Chủ tịch thường trực'],
    ['Lãnh đạo Ban Tuyên giáo và Dân vận Tỉnh ủy', 'Phó Chủ tịch'],
    ['Lãnh đạo Sở Văn hóa, Thể thao và Du lịch', 'Ủy viên'],
    ['Lãnh đạo Sở Giáo dục và Đào tạo', 'Ủy viên'],
    ['Lãnh đạo Công an tỉnh', 'Ủy viên'],
    ['Lãnh đạo Sở Dân tộc và Tôn giáo', 'Ủy viên'],
    ['Lãnh đạo Ủy ban MTTQ Việt Nam tỉnh', 'Ủy viên'],
    ['Lãnh đạo Báo và Phát thanh, Truyền hình Lào Cai', 'Ủy viên'],
    ['Lãnh đạo Phòng PBGDPL, Sở Tư pháp', 'Ủy viên, Thư ký'],
];

const PROVINCE_SECRETARIAT = [
    ['Lãnh đạo Phòng PBGDPL, Sở Tư pháp', 'Tổ trưởng'],
    ['Chuyên viên Phòng PBGDPL, Sở Tư pháp', 'Tổ phó'],
    ['Chuyên viên Văn phòng UBND tỉnh', 'Thành viên'],
    ['Chuyên viên Sở Văn hóa, Thể thao và Du lịch', 'Thành viên'],
    ['Chuyên viên Sở Giáo dục và Đào tạo', 'Thành viên'],
    ['Cán bộ Công an tỉnh', 'Thành viên'],
    ['Chuyên viên Sở Dân tộc và Tôn giáo', 'Thành viên'],
    ['Chuyên viên Phòng PBGDPL, Sở Tư pháp', 'Thành viên, Thư ký tổng hợp'],
];

const communeMembers = (kind, name) => [
    [`Chủ tịch UBND ${kind} ${name}`, 'Chủ tịch Hội đồng'],
    [`Phó Chủ tịch UBND ${kind} ${name}`, 'Phó Chủ tịch'],
    ['Công chức Tư pháp - Hộ tịch', 'Phó Chủ tịch thường trực'],
    [`Chủ tịch Ủy ban MTTQ Việt Nam ${kind}`, 'Ủy viên'],
    [`Trưởng Công an ${kind}`, 'Ủy viên'],
    [`Bí thư Đoàn Thanh niên ${kind}`, 'Ủy viên'],
    [`Chủ tịch Hội Liên hiệp Phụ nữ ${kind}`, 'Ủy viên'],
    ['Hiệu trưởng trường trung học cơ sở trên địa bàn', 'Ủy viên'],
];

const communeSecretariat = (kind) => [
    ['Công chức Tư pháp - Hộ tịch', 'Tổ trưởng'],
    [`Công chức Văn phòng - Thống kê ${kind}`, 'Thành viên'],
    [`Công chức Văn hóa - Xã hội ${kind}`, 'Thành viên'],
];

const toPeople = (rows) => rows.map(([position, role], i) => ({ id: i + 1, position, role }));

const COMMUNES = [
    ['phuong', 'Cam Đường', 'phường'],
    ['phuong', 'Lào Cai', 'phường'],
    ['phuong', 'Sa Pa', 'phường'],
    ['xa', 'Bát Xát', 'xã'],
    ['xa', 'Bắc Hà', 'xã'],
    ['xa', 'Mường Khương', 'xã'],
    ['xa', 'Si Ma Cai', 'xã'],
    ['xa', 'Y Tý', 'xã'],
    ['xa', 'Văn Bàn', 'xã'],
    ['phuong', 'Cốc San', 'phường'],
    ['xa', 'Bảo Yên', 'xã'],
];

const slug = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase().replace(/\s+/g, '-');

export const LAOCAI_V2_COUNCILS = [
    {
        id: 'hoi-dong-tinh-lao-cai',
        code: 'HĐPH-LC-01',
        name: 'Hội đồng phối hợp phổ biến, giáo dục pháp luật tỉnh Lào Cai',
        level: 'Cấp tỉnh',
        unit: 'Sở Tư pháp tỉnh Lào Cai',
        area: 'Tỉnh Lào Cai',
        decision: '1250/QĐ-UBND',
        decisionDate: '15/07/2025',
        term: '2025 - 2030',
        address: 'Sở Tư pháp tỉnh Lào Cai',
        status: 'Đang hoạt động',
        members: toPeople(PROVINCE_MEMBERS),
        secretariat: toPeople(PROVINCE_SECRETARIAT),
    },
    ...COMMUNES.map(([, name, kind], i) => {
        const day = String(20 - i).padStart(2, '0');
        return {
            id: `hoi-dong-${kind === 'phường' ? 'phuong' : 'xa'}-${slug(name)}`,
            code: `HĐPH-LC-${String(i + 2).padStart(2, '0')}`,
            name: `Hội đồng phối hợp phổ biến, giáo dục pháp luật ${kind} ${name}`,
            level: 'Cấp xã',
            unit: `UBND ${kind} ${name}`,
            area: `${kind.charAt(0).toUpperCase() + kind.slice(1)} ${name}`,
            decision: `${85 + i * 7}/QĐ-UBND`,
            decisionDate: `${day}/08/2025`,
            term: '2025 - 2030',
            address: `UBND ${kind} ${name}, tỉnh Lào Cai`,
            status: 'Đang hoạt động',
            members: toPeople(communeMembers(kind, name)),
            secretariat: toPeople(communeSecretariat(kind)),
        };
    }),
];

export const findCouncil = (id) => LAOCAI_V2_COUNCILS.find((c) => c.id === id);

// Danh sách Cổng dùng cho dropdown chọn Cổng trong menu dọc (Header)
export const PORTALS = [
    { id: 'quoc-gia', label: 'Cổng Pháp luật quốc gia', homeUrl: '/' },
    { id: 'ha-noi', label: 'Cổng Pháp luật Thành phố Hà Nội', homeUrl: '/ha-noi' },
    // Bản 1 (/lao-cai) và bản 3 (/lao-cai-v3) được ẩn khỏi danh sách, route vẫn giữ
    { id: 'lao-cai-v2', label: 'Cổng Pháp luật tỉnh Lào Cai', homeUrl: '/lao-cai-v2' },
    { id: 'tuyen-quang', label: 'Cổng Pháp luật tỉnh Tuyên Quang', homeUrl: '/tuyen-quang' },
];

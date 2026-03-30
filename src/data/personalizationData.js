export const LEGAL_FIELDS = [
    {
        id: 'dat-dai', title: 'Đất đai & Nhà ở', thumbnail: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=300',
        subFields: [
            { id: 'dat-dai-quy-hoach', title: 'Quy hoạch sử dụng đất' },
            { id: 'dat-dai-boi-thuong', title: 'Bồi thường, giải phóng mặt bằng' },
            { id: 'dat-dai-tranh-chap', title: 'Tranh chấp đất đai' },
            { id: 'dat-dai-chuyen-nhuong', title: 'Chuyển nhượng, mua bán nhà đất' },
            { id: 'dat-dai-cap-so', title: 'Cấp Giấy chứng nhận (Sổ đỏ)' }
        ]
    },
    {
        id: 'doanh-nghiep', title: 'Doanh nghiệp & Đầu tư', thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=300',
        subFields: [
            { id: 'doanh-nghiep-thanh-lap', title: 'Thành lập doanh nghiệp' },
            { id: 'doanh-nghiep-ma', title: 'Mua bán sáp nhập (M&A)' },
            { id: 'doanh-nghiep-fdi', title: 'Đầu tư nước ngoài (FDI)' },
            { id: 'doanh-nghiep-quan-tri', title: 'Quản trị nội bộ' },
            { id: 'doanh-nghiep-pha-san', title: 'Phá sản, giải thể' }
        ]
    },
    {
        id: 'lao-dong', title: 'Lao động & Việc làm', thumbnail: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=300',
        subFields: [
            { id: 'lao-dong-hop-dong', title: 'Hợp đồng lao động' },
            { id: 'lao-dong-bhxh', title: 'Bảo hiểm xã hội, BHYT, BHTN' },
            { id: 'lao-dong-tranh-chap', title: 'Tranh chấp lao động' },
            { id: 'lao-dong-an-toan', title: 'An toàn, vệ sinh lao động' }
        ]
    },
    {
        id: 'thue', title: 'Thuế & Tài chính', thumbnail: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=300',
        subFields: [
            { id: 'thue-tndn', title: 'Thuế Thu nhập doanh nghiệp' },
            { id: 'thue-tncn', title: 'Thuế Thu nhập cá nhân' },
            { id: 'thue-gtgt', title: 'Thuế Giá trị gia tăng (VAT)' },
            { id: 'thue-hoa-don', title: 'Hoá đơn điện tử' },
            { id: 'thue-hai-quan', title: 'Hải quan, Xuất nhập khẩu' }
        ]
    },
    {
        id: 'dan-su', title: 'Dân sự', thumbnail: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=300',
        subFields: [
            { id: 'dan-su-hon-nhan', title: 'Hôn nhân & Gia đình' },
            { id: 'dan-su-thua-ke', title: 'Thừa kế' },
            { id: 'dan-su-hop-dong', title: 'Hợp đồng dân sự' },
            { id: 'dan-su-so-huu-tri-tue', title: 'Sở hữu trí tuệ' }
        ]
    },
    {
        id: 'hinh-su', title: 'Hình sự', thumbnail: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=300',
        subFields: [
            { id: 'hinh-su-kinh-te', title: 'Tội phạm kinh tế' },
            { id: 'hinh-su-cong-nghe-cao', title: 'Tội phạm công nghệ cao' },
            { id: 'hinh-su-tham-nhung', title: 'Tham nhũng, chức vụ' },
            { id: 'hinh-su-hanh-chinh', title: 'Xử lý vi phạm hành chính' }
        ]
    }
];

export const NEWS_CATEGORIES = [
    { id: 'news-tin-nong', title: 'Tin nóng pháp luật', thumbnail: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=300' },
    { id: 'news-chinh-sach', title: 'Chính sách mới', thumbnail: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=300' },
    { id: 'news-phan-tich', title: 'Phân tích & Bình luận', thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=300' },
];

export const FORUMS = [
    { id: 'forum-luat-su', title: 'Cộng đồng Luật sư', thumbnail: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=300' },
    { id: 'forum-doanh-nghiep', title: 'Hỏi đáp Doanh nghiệp', thumbnail: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=300' },
];

export const STATISTICS = [
    { id: 'stat-comments-count', title: 'Số lượt bình luận', thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=300' },
    { id: 'stat-comments-bar', title: 'Lượt bình luận qua các tháng', thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=300' },
    { id: 'stat-topics-pie', title: 'Tỷ lệ chuyên mục quan tâm', thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=300' },
];

export const ALL_ITEMS = [...LEGAL_FIELDS, ...NEWS_CATEGORIES, ...FORUMS, ...STATISTICS];

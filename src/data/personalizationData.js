export const LEGAL_FIELDS = [
    { id: 'dat-dai', title: 'Đất đai & Nhà ở', thumbnail: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=300' },
    { id: 'doanh-nghiep', title: 'Doanh nghiệp & Đầu tư', thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=300' },
    { id: 'lao-dong', title: 'Lao động & Việc làm', thumbnail: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=300' },
    { id: 'thue', title: 'Thuế & Tài chính', thumbnail: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=300' },
    { id: 'dan-su', title: 'Dân sự', thumbnail: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=300' },
    { id: 'hinh-su', title: 'Hình sự', thumbnail: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=300' }
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

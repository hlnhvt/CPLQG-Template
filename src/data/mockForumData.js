export const MOCK_FORUMS = [
    {
        id: 1,
        title: "Thảo luận Luật Doanh nghiệp",
        description: "Không gian kết nối, trao đổi và giải đáp các vấn đề liên quan đến Luật Doanh nghiệp, các quy định thành lập và vận hành doanh nghiệp.",
        tags: ["Doanh nghiệp", "Đầu tư", "Khởi nghiệp"],
        topicCount: 1245,
        memberCount: 5230,
        lastActive: "10 phút trước",
        isFollowing: true,
        thumbnail: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=80"
    },
    {
        id: 2,
        title: "Hỏi đáp Pháp luật Lao động",
        description: "Góc tư vấn dành cho người lao động và người sử dụng lao động về hợp đồng, bảo hiểm, tiền lương và quyền lợi hợp pháp.",
        tags: ["Lao động", "Bảo hiểm xã hội", "Công đoàn"],
        topicCount: 890,
        memberCount: 3400,
        lastActive: "1 giờ trước",
        isFollowing: false,
        thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&q=80"
    },
    {
        id: 3,
        title: "Tư vấn Pháp luật Đất đai",
        description: "Nơi thảo luận về các quy định phân lô, bán nền, cấp sổ đỏ, giải tỏa và đền bù đất đai.",
        tags: ["Đất đai", "Bất động sản", "Thuế"],
        topicCount: 2056,
        memberCount: 8100,
        lastActive: "5 phút trước",
        isFollowing: true,
        thumbnail: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&q=80"
    },
    {
        id: 4,
        title: "Pháp luật Hình sự",
        description: "Trao đổi chuyên môn, phân tích các vụ án hình sự và quy định của Bộ luật Hình sự.",
        tags: ["Hình sự", "Tố tụng", "An ninh"],
        topicCount: 560,
        memberCount: 2150,
        lastActive: "3 giờ trước",
        isFollowing: false,
        thumbnail: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&q=80"
    },
    {
        id: 5,
        title: "Pháp luật Hôn nhân & Gia đình",
        description: "Giải đáp thắc mắc về kết hôn, ly hôn, quyền nuôi con và chia tài sản.",
        tags: ["Hôn nhân", "Gia đình", "Dân sự"],
        topicCount: 1540,
        memberCount: 6200,
        lastActive: "Vừa xong",
        isFollowing: false,
        thumbnail: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400&q=80"
    },
    {
        id: 6,
        title: "Thuế và Kế toán",
        description: "Cộng đồng chia sẻ kiến thức, kinh nghiệm báo cáo thuế, quyết toán và các luật thuế mới.",
        tags: ["Thuế", "Kế toán", "Tài chính"],
        topicCount: 673,
        memberCount: 1980,
        lastActive: "4 giờ trước",
        isFollowing: false,
        thumbnail: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&q=80"
    }
];

export const MOCK_TOPICS = [
    {
        id: 1,
        forumId: 1,
        title: "Quy định mới về vốn điều lệ công ty TNHH năm 2024",
        author: {
            name: "Nguyễn Văn A",
            role: "Luật sư",
            avatar: ""
        },
        createdAt: "2 giờ trước",
        views: 1250,
        comments: 45,
        votes: 120,
        tags: ["Vốn điều lệ", "Luật Doanh nghiệp 2020"],
        status: "open",
        isHot: true
    },
    {
        id: 2,
        forumId: 1,
        title: "Thủ tục thay đổi người đại diện theo pháp luật",
        author: {
            name: "Trần Thị B",
            role: "Cộng đồng",
            avatar: ""
        },
        createdAt: "5 giờ trước",
        views: 340,
        comments: 12,
        votes: 25,
        tags: ["Người đại diện", "Thủ tục hành chính"],
        status: "open",
        isHot: false
    },
    // Add more...
];

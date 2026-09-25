import React, { useEffect, useState } from 'react';
import { ChevronRight, Printer, Share2, Facebook, MessageCircle } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import CommentSection from '../../components/CommentSection';
import LaoCaiV2NewsSubNav, { LAOCAI_V2_NEWS_CATEGORIES } from '../../components/laocaiV2/LaoCaiV2NewsSubNav';
import { CATEGORY_ARTICLES } from './LaoCaiV2NewsCategoryPage';

// Trang chi tiết tin tức riêng của Cổng Pháp luật tỉnh Lào Cai (layout theo trang /news/:id của Cổng quốc gia)

const findArticle = (id) => {
    for (const [catId, list] of Object.entries(CATEGORY_ARTICLES)) {
        const found = list.find((a) => String(a.id) === String(id));
        if (found) return { article: found, catId };
    }
    const catId = Object.keys(CATEGORY_ARTICLES)[0];
    return { article: CATEGORY_ARTICLES[catId][0], catId };
};

const LAOCAI_COMMENTS = [
    {
        id: 1,
        author: 'Lò Văn Hùng',
        avatar: 'L',
        content: 'Thông tin rất thiết thực. Mong Sở Tư pháp tiếp tục đưa các nội dung này về thôn, bản bằng tiếng dân tộc để bà con dễ hiểu hơn.',
        likes: 12,
        time: '2 giờ trước',
        status: 'published',
        isMine: false
    },
    {
        id: 2,
        author: 'Nguyễn Thị Mai',
        avatar: 'N',
        content: 'Đề nghị Cổng bổ sung thêm infographic hướng dẫn thủ tục để người dân tra cứu nhanh trên điện thoại.',
        likes: 7,
        time: '5 giờ trước',
        status: 'published',
        isMine: false
    }
];

const LaoCaiV2NewsDetailPage = () => {
    const { id } = useParams();
    const { article, catId } = findArticle(id);
    const category = LAOCAI_V2_NEWS_CATEGORIES.find((c) => c.id === catId);
    const [fontScale, setFontScale] = useState(100);

    const latest = Object.values(CATEGORY_ARTICLES)
        .flat()
        .filter((a) => a.id !== article.id)
        .slice(0, 5);

    useEffect(() => {
        document.title = `${article.title} - Cổng Pháp luật tỉnh Lào Cai`;
        window.scrollTo(0, 0);
    }, [article.id]);

    return (
        <div className="bg-white min-h-screen">
            {/* Sub Nav của trang Tin tức, đánh dấu chuyên mục của bài viết */}
            <LaoCaiV2NewsSubNav activeId={catId} />

            <div className="container mx-auto px-4 py-6 max-w-[1286px]">
                {/* Breadcrumbs */}
                <nav className="flex flex-wrap items-center text-sm text-gray-500 mb-6">
                    <Link to="/lao-cai-v2" className="hover:text-[#0f4c81]">Trang chủ Lào Cai</Link>
                    <ChevronRight size={14} className="mx-2" />
                    <Link to="/lao-cai-v2/tin-tuc" className="hover:text-[#0f4c81]">Tin tức &amp; Sự kiện</Link>
                    {category && (
                        <>
                            <ChevronRight size={14} className="mx-2" />
                            <Link to={`/lao-cai-v2/tin-tuc/${category.id}`} className="hover:text-[#0f4c81]">{category.label}</Link>
                        </>
                    )}
                    <ChevronRight size={14} className="mx-2" />
                    <span className="text-gray-800">Chi tiết</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Main Content Area */}
                    <div className="lg:col-span-3">
                        <h1 className="text-2xl md:text-3xl font-bold text-[#0f4c81] leading-tight mb-4">
                            {article.title}
                        </h1>

                        {/* Meta & Actions */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center py-3 border-y border-gray-100 mb-6 text-sm text-gray-500 gap-4">
                            <span>{article.date} 08:30</span>
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-full border">
                                    <button onClick={() => setFontScale((v) => Math.max(80, v - 10))} className="hover:text-[#0f4c81] font-bold text-lg leading-none">-</button>
                                    <span>{fontScale}%</span>
                                    <button onClick={() => setFontScale((v) => Math.min(150, v + 10))} className="hover:text-[#0f4c81] font-bold text-lg leading-none">+</button>
                                </div>
                                <button onClick={() => window.print()} className="p-1.5 rounded-full border hover:bg-gray-50 text-[#0f4c81]"><Printer size={16} /></button>
                                <button className="p-1.5 rounded-full border hover:bg-gray-50 text-[#0f4c81]"><Facebook size={16} /></button>
                                <button className="p-1.5 rounded-full border hover:bg-gray-50 text-[#0f4c81]"><Share2 size={16} /></button>
                            </div>
                        </div>

                        {/* Article Content (dữ liệu mẫu) */}
                        <div className="prose max-w-none text-gray-800 leading-relaxed" style={{ fontSize: `${fontScale}%` }}>
                            <p className="font-bold mb-4">{article.summary}</p>

                            <div className="my-6">
                                <img src={article.image} alt={article.title} className="w-full rounded-lg mb-2" />
                                <p className="text-sm text-center italic text-gray-500">
                                    {article.title} – Ảnh: Cổng Pháp luật tỉnh Lào Cai
                                </p>
                            </div>

                            <h3 className="text-xl font-bold text-[#0f4c81] mt-8 mb-4">Nội dung chính</h3>
                            <p className="mb-4">
                                Thực hiện chỉ đạo của UBND tỉnh Lào Cai, Sở Tư pháp chủ trì, phối hợp với các sở, ngành và UBND các xã, phường triển khai nhiệm vụ theo kế hoạch đã đề ra, bảo đảm phù hợp với mô hình chính quyền địa phương hai cấp và điều kiện thực tế của từng địa bàn.
                            </p>
                            <p className="mb-4">
                                Các nội dung được tổ chức theo hướng trực quan, dễ hiểu, ưu tiên hình thức infographic, video tình huống và tuyên truyền trực tiếp tại thôn, bản, tổ dân phố; chú trọng đối tượng là đồng bào dân tộc thiểu số, người dân vùng cao, biên giới.
                            </p>

                            <div className="my-6">
                                <img src={article.image === '/thumb1.png' ? '/thumb3.png' : '/thumb1.png'} alt="Hoạt động" className="w-full rounded-lg mb-2" />
                                <p className="text-sm text-center italic text-gray-500">
                                    Quang cảnh hoạt động – Ảnh: Cổng Pháp luật tỉnh Lào Cai
                                </p>
                            </div>

                            <h3 className="text-xl font-bold text-[#0f4c81] mt-8 mb-4">Nhiệm vụ thời gian tới</h3>
                            <p className="mb-4">
                                Sở Tư pháp đề nghị các cơ quan, đơn vị, địa phương tiếp tục quán triệt, tổ chức thực hiện nghiêm túc, kịp thời báo cáo khó khăn, vướng mắc để được hướng dẫn, tháo gỡ; đồng thời cập nhật thông tin trên Cổng Pháp luật tỉnh Lào Cai để người dân, doanh nghiệp theo dõi.
                            </p>
                        </div>

                        <div className="mt-8 pt-6 border-t font-semibold text-right text-sm">
                            Theo <span className="text-[#0f4c81]">Sở Tư pháp tỉnh Lào Cai</span>
                        </div>

                        {/* Góp ý & Ý kiến */}
                        <CommentSection key={article.id} initialComments={LAOCAI_COMMENTS} />
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1 space-y-8">
                        {/* Latest News */}
                        <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
                            <div className="bg-gray-50 border-b py-3 px-4">
                                <h3 className="font-bold text-[#0f4c81] uppercase">Tin mới nhất</h3>
                            </div>
                            <div className="p-4 space-y-4">
                                {latest.map((item) => (
                                    <Link key={item.id} to={`/lao-cai-v2/tin-tuc/chi-tiet/${item.id}`} className="flex gap-3 items-start group pb-4 border-b last:border-0 last:pb-0">
                                        <div className="w-16 h-12 bg-gray-200 rounded shrink-0 overflow-hidden">
                                            <img src={item.image} alt="thumb" className="w-full h-full object-cover group-hover:scale-110 transition" />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-semibold text-gray-800 group-hover:text-[#0f4c81] leading-snug line-clamp-2">{item.title}</h4>
                                            <span className="text-[10px] text-gray-500 mt-1 block">{item.date}</span>
                                        </div>
                                    </Link>
                                ))}
                                <div className="pt-2">
                                    <Link to="/lao-cai-v2/tin-tuc" className="text-[#0f4c81] text-sm font-medium hover:underline">Xem tất cả tin</Link>
                                </div>
                            </div>
                        </div>

                        {/* Propaganda Banner */}
                        <Link to="/lao-cai-v2/tin-tuc/ngay-phap-luat" className="block rounded-lg overflow-hidden relative group shadow-sm border border-orange-200">
                            <img src="/poster1.png" alt="Poster" className="w-full h-auto aspect-square object-cover opacity-80 group-hover:opacity-100 transition" />
                            <div className="absolute inset-0 bg-gradient-to-t from-red-900 via-transparent to-transparent flex flex-col justify-end p-4">
                                <h4 className="text-yellow-400 font-bold text-lg uppercase drop-shadow-md pb-1 border-b border-yellow-400/50">Lễ hưởng ứng</h4>
                                <h5 className="text-white font-black text-xl leading-tight uppercase mt-1 drop-shadow-md">Ngày Pháp luật nước CHXHCN Việt Nam</h5>
                            </div>
                        </Link>

                        {/* Feedback Box */}
                        <div className="bg-[#0a365c] text-white rounded-lg p-6 text-center space-y-4 shadow-lg relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full blur-3xl opacity-20 -mr-10 -mt-10"></div>
                            <h3 className="font-bold text-xl uppercase tracking-wider relative z-10">Lắng nghe &amp;<br />Phản hồi</h3>
                            <div className="flex justify-center my-4 relative z-10">
                                <div className="bg-white/10 p-4 rounded-full border border-white/20">
                                    <MessageCircle size={32} className="text-blue-200" />
                                </div>
                            </div>
                            <p className="text-xs text-blue-100 mb-6 relative z-10">
                                Người dân và doanh nghiệp tỉnh Lào Cai có thể gửi câu hỏi, góp ý về chính sách, pháp luật qua các kênh dưới đây:
                            </p>
                            <Link to="/lao-cai-v2/hoi-dap" className="relative z-10 block w-full bg-white text-[#0a365c] font-bold py-2 rounded uppercase text-sm hover:bg-yellow-400 transition mb-2">
                                Gửi câu hỏi online
                            </Link>
                            <Link to="/lao-cai-v2/hotline" className="relative z-10 block w-full bg-transparent border border-white/50 text-white font-medium py-2 rounded uppercase text-sm hover:bg-white/10 transition">
                                Đường dây nóng
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LaoCaiV2NewsDetailPage;

import React, { useEffect } from 'react';
import LaoCaiV2PageIntro from '../../../components/laocaiV2/LaoCaiV2PageIntro';
import GenericArticleList from '../pho-bien-giao-duc/components/GenericArticleList';

// Bài giảng trực tuyến (từ mục "Bồi dưỡng, tập huấn trực tuyến" của chuyên trang PBGDPL). Dữ liệu mẫu.
const LECTURES = [
    'Kỹ năng phổ biến pháp luật cho đồng bào dân tộc thiểu số',
    'Nghiệp vụ hòa giải ở cơ sở dành cho hòa giải viên mới',
    'Những điểm mới của Luật Đất đai 2024',
    'Hướng dẫn đánh giá xã, phường đạt chuẩn tiếp cận pháp luật',
    'Kỹ năng xây dựng video, infographic tuyên truyền pháp luật',
    'Phòng, chống lừa đảo trên không gian mạng',
].map((title, i) => ({
    // Ảnh nền lấy từ kho public có sẵn
    image: ['/thumbnails/toadan_phapluat.png', '/thumbnails/civil_inheritance_illustration.png', '/thumbnails/land_housing_illustration.png', '/thumbnails/forum_dat_dai.png', '/thumbnails/livestream_giabangdat.png', '/thumbnails/currency_bank_illustration.png'][i],
    id: i + 1,
    title: `Bài giảng: ${title}`,
    description: 'Bài giảng trực tuyến phục vụ bồi dưỡng báo cáo viên, tuyên truyền viên pháp luật, hòa giải viên và cán bộ tư pháp cấp xã trên địa bàn tỉnh Lào Cai.',
    date: `0${(i % 9) + 1}/06/2026`,
    category: 'Bài giảng'
}));

const BaiGiangTrucTuyenPage = () => {
    useEffect(() => {
        document.title = 'Bài giảng trực tuyến - Cổng Pháp luật tỉnh Lào Cai';
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-[#f0f4f8] pb-16">
            <LaoCaiV2PageIntro
                crumbs={[{ label: 'Phổ biến, giáo dục pháp luật' }, { label: 'Bài giảng trực tuyến' }]}
                title="Bài giảng trực tuyến"
                subtitle="Bài giảng bồi dưỡng, tập huấn trực tuyến về kiến thức, kỹ năng phổ biến, giáo dục pháp luật"
            />
            <div className="container mx-auto px-4 max-w-[1286px] pt-8">
                <GenericArticleList title="Bài giảng trực tuyến" items={LECTURES} />
            </div>
        </div>
    );
};

export default BaiGiangTrucTuyenPage;

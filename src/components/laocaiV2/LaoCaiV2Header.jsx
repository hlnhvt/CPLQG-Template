import React from 'react';
import Header from '../Header';

// Ẩn 3 chuyên trang trên nav; "Phổ biến, giáo dục pháp luật" chỉ là menu thả xuống (không dẫn tới chuyên trang)
export const LAOCAI_V2_SPECIAL_NAV = [
    {
        label: 'Phổ biến, giáo dục pháp luật',
        children: [
            { path: 'chi-dao-dieu-hanh', label: 'Chỉ đạo điều hành' },
            { path: 'hoa-giai-co-so', label: 'Hòa giải ở cơ sở' },
            { path: 'tu-sach-phap-luat', label: 'Tủ sách pháp luật' },
            { path: 'hoi-dong-phoi-hop', label: 'Hội đồng phối hợp PBGDPL tỉnh' },
            { path: 'bao-cao-vien', label: 'Báo cáo viên pháp luật tỉnh' },
            { path: 'tuyen-truyen-vien', label: 'Tuyên truyền viên pháp luật tỉnh' },
            { path: 'bai-giang-truc-tuyen', label: 'Bài giảng trực tuyến' },
        ],
    },
];

const LaoCaiV2Header = () => {
    return (
        <Header
            title="CỔNG PHÁP LUẬT TỈNH LÀO CAI"
            homeUrl="/lao-cai-v2"
            isSubSite={true}
            hideDraftNav={true}
            showMultimedia={true}
            specialNav={LAOCAI_V2_SPECIAL_NAV}
        />
    );
};

export default LaoCaiV2Header;

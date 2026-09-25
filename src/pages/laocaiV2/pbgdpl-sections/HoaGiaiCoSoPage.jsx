import React, { useEffect } from 'react';
import LaoCaiV2PageIntro from '../../../components/laocaiV2/LaoCaiV2PageIntro';
import HoaGiaiCoSo from '../pho-bien-giao-duc/components/HoaGiaiCoSo';

// Hòa giải ở cơ sở: tách từ tab cùng tên của trang PBGDPL thành mục riêng trên nav
const HoaGiaiCoSoPage = () => {
    useEffect(() => {
        document.title = 'Hòa giải ở cơ sở - Cổng Pháp luật tỉnh Lào Cai';
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-[#f0f4f8] pb-16">
            <LaoCaiV2PageIntro
                crumbs={[{ label: 'Phổ biến, giáo dục pháp luật' }, { label: 'Hòa giải ở cơ sở' }]}
                title="Hòa giải ở cơ sở"
                subtitle="Tin tức, vụ việc điển hình, số liệu và tài liệu nghiệp vụ về công tác hòa giải ở cơ sở trên địa bàn tỉnh Lào Cai"
            />
            <div className="container mx-auto px-4 max-w-[1286px] pt-8">
                <HoaGiaiCoSo hideHeader />
            </div>
        </div>
    );
};

export default HoaGiaiCoSoPage;

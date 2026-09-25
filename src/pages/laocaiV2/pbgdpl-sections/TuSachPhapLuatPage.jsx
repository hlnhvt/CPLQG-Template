import React, { useEffect } from 'react';
import LaoCaiV2PageIntro from '../../../components/laocaiV2/LaoCaiV2PageIntro';
import TuSachPhapLuat from '../pho-bien-giao-duc/components/TuSachPhapLuat';

// Tủ sách pháp luật: tách từ tab cùng tên của trang PBGDPL thành mục riêng trên nav
const TuSachPhapLuatPage = () => {
    useEffect(() => {
        document.title = 'Tủ sách pháp luật - Cổng Pháp luật tỉnh Lào Cai';
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-[#f0f4f8] pb-16">
            <LaoCaiV2PageIntro
                crumbs={[{ label: 'Phổ biến, giáo dục pháp luật' }, { label: 'Tủ sách pháp luật' }]}
                title="Tủ sách pháp luật"
                subtitle="Đề cương, tài liệu giới thiệu văn bản pháp luật và sổ tay nghiệp vụ phục vụ người dân, cán bộ tỉnh Lào Cai tra cứu, tìm hiểu"
            />
            <div className="container mx-auto px-4 max-w-[1286px] pt-8">
                <TuSachPhapLuat hideHeader />
            </div>
        </div>
    );
};

export default TuSachPhapLuatPage;

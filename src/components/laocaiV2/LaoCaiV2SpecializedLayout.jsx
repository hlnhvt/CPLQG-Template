import React from 'react';
import { Outlet } from 'react-router-dom';
import LaoCaiV2Header from './LaoCaiV2Header';
import LaoCaiV2Footer from './LaoCaiV2Footer';

// Khung chung cho 3 chuyên trang (clone từ Cổng Pháp luật quốc gia): header/footer của Cổng Lào Cai, nội dung chuyên trang ở giữa
const LaoCaiV2SpecializedLayout = () => (
    <div className="font-sans min-h-screen flex flex-col">
        <LaoCaiV2Header />
        <div className="flex-grow">
            <Outlet />
        </div>
        <LaoCaiV2Footer />
    </div>
);

export default LaoCaiV2SpecializedLayout;

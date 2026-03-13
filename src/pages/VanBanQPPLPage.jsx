import React from 'react';
import LegalDocListPage from '../components/LegalDocListPage';

const VanBanQPPLPage = () => (
    <LegalDocListPage
        pageTitle="Danh sách Văn bản quy phạm pháp luật"
        breadcrumb="Danh sách VBQPPL"
        badgeColor="bg-[#1a3b8b]"
        showSemanticBadge={true}
        show45SoHieu={true}
    />
);

export default VanBanQPPLPage;

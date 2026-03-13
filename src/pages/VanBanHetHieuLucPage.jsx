import React from 'react';
import LegalDocListPage from '../components/LegalDocListPage';

const VanBanHetHieuLucPage = () => (
    <LegalDocListPage
        pageTitle="Văn bản hết hiệu lực trong tháng"
        breadcrumb="Văn bản hết hiệu lực"
        badgeColor="bg-red-700"
        showMonthYear={true}
        forcedStatus="expired"
    />
);

export default VanBanHetHieuLucPage;

import React from 'react';
import LegalDocListPage from '../components/LegalDocListPage';

const VanBanHieuLucPage = () => (
    <LegalDocListPage
        pageTitle="Văn bản có hiệu lực trong tháng"
        breadcrumb="Văn bản có hiệu lực"
        badgeColor="bg-green-700"
        showMonthYear={true}
        forcedStatus="active"
    />
);

export default VanBanHieuLucPage;

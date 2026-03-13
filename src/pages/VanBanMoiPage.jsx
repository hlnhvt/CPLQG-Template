import React from 'react';
import LegalDocListPage from '../components/LegalDocListPage';

const VanBanMoiPage = () => (
    <LegalDocListPage
        pageTitle="Văn bản mới ban hành / Văn bản hợp nhất"
        breadcrumb="Văn bản mới / Hợp nhất"
        badgeColor="bg-blue-700"
        tabs={['Văn bản mới ban hành', 'Văn bản hợp nhất']}
        tabModes={[null, null]}
    />
);

export default VanBanMoiPage;

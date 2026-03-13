import React from 'react';
import LegalDocListPage from '../components/LegalDocListPage';

// UC43 + UC44 combined: "Văn bản được chú ý"
// Tab 0: Xem nhiều (UC43) - shows view count
// Tab 1: Quan tâm (UC44)  - shows engagement (comments, shares, saves)
const VanBanChuYPage = () => (
    <LegalDocListPage
        pageTitle="Văn bản được chú ý"
        breadcrumb="Văn bản được chú ý"
        badgeColor="bg-indigo-700"
        tabs={['Văn bản được xem nhiều', 'Văn bản được quan tâm']}
        tabModes={['views', 'engagement']}
    />
);

export default VanBanChuYPage;

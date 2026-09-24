import React from 'react';
import LaoCaiHeader from '../../components/laocai/LaoCaiHeader';
import LaoCaiFooter from '../../components/laocai/LaoCaiFooter';
import BusinessFAQDetailPortalPage from '../../components/portal/specialized/BusinessFAQDetailPortalPage';
import { laocaiProfile } from '../../data/portals/profiles';

// Chi tiết câu hỏi của tab "Hỏi đáp doanh nghiệp" (chuyên trang Hỗ trợ pháp lý doanh nghiệp)
const LaoCaiBusinessFAQDetailPage = () => <BusinessFAQDetailPortalPage profile={laocaiProfile} Header={LaoCaiHeader} Footer={LaoCaiFooter} />;

export default LaoCaiBusinessFAQDetailPage;

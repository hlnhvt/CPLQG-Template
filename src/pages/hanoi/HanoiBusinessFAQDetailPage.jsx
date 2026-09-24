import React from 'react';
import HanoiHeader from '../../components/hanoi/HanoiHeader';
import HanoiFooter from '../../components/hanoi/HanoiFooter';
import BusinessFAQDetailPortalPage from '../../components/portal/specialized/BusinessFAQDetailPortalPage';
import { hanoiProfile } from '../../data/portals/profiles';

// Chi tiết câu hỏi của tab "Hỏi đáp doanh nghiệp" (chuyên trang Hỗ trợ pháp lý doanh nghiệp)
const HanoiBusinessFAQDetailPage = () => <BusinessFAQDetailPortalPage profile={hanoiProfile} Header={HanoiHeader} Footer={HanoiFooter} />;

export default HanoiBusinessFAQDetailPage;

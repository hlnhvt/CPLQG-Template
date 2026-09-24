import React from 'react';
import HanoiHeader from '../../components/hanoi/HanoiHeader';
import HanoiFooter from '../../components/hanoi/HanoiFooter';
import BusinessSupportPortalPage from '../../components/portal/specialized/BusinessSupportPortalPage';
import { hanoiProfile } from '../../data/portals/profiles';

// Chuyên trang dùng bộ khung chung (components/portal/specialized), nội dung theo hồ sơ Cổng
const HanoiBusinessSupportPage = () => <BusinessSupportPortalPage profile={hanoiProfile} Header={HanoiHeader} Footer={HanoiFooter} />;

export default HanoiBusinessSupportPage;

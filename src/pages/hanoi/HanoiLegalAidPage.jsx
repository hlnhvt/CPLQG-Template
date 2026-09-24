import React from 'react';
import HanoiHeader from '../../components/hanoi/HanoiHeader';
import HanoiFooter from '../../components/hanoi/HanoiFooter';
import LegalAidPortalPage from '../../components/portal/specialized/LegalAidPortalPage';
import { hanoiProfile } from '../../data/portals/profiles';

// Chuyên trang dùng bộ khung chung (components/portal/specialized), nội dung theo hồ sơ Cổng
const HanoiLegalAidPage = () => <LegalAidPortalPage profile={hanoiProfile} Header={HanoiHeader} Footer={HanoiFooter} />;

export default HanoiLegalAidPage;

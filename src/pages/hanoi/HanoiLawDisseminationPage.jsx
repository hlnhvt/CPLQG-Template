import React from 'react';
import HanoiHeader from '../../components/hanoi/HanoiHeader';
import HanoiFooter from '../../components/hanoi/HanoiFooter';
import LawDisseminationPortalPage from '../../components/portal/specialized/LawDisseminationPortalPage';
import { hanoiProfile } from '../../data/portals/profiles';

// Chuyên trang dùng bộ khung chung (components/portal/specialized), nội dung theo hồ sơ Cổng
const HanoiLawDisseminationPage = () => <LawDisseminationPortalPage profile={hanoiProfile} Header={HanoiHeader} Footer={HanoiFooter} />;

export default HanoiLawDisseminationPage;

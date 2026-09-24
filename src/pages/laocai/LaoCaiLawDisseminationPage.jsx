import React from 'react';
import LaoCaiHeader from '../../components/laocai/LaoCaiHeader';
import LaoCaiFooter from '../../components/laocai/LaoCaiFooter';
import LawDisseminationPortalPage from '../../components/portal/specialized/LawDisseminationPortalPage';
import { laocaiProfile } from '../../data/portals/profiles';

// Chuyên trang dùng bộ khung chung (components/portal/specialized), nội dung theo hồ sơ Cổng
const LaoCaiLawDisseminationPage = () => <LawDisseminationPortalPage profile={laocaiProfile} Header={LaoCaiHeader} Footer={LaoCaiFooter} />;

export default LaoCaiLawDisseminationPage;

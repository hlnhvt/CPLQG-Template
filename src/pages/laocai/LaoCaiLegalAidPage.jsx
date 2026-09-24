import React from 'react';
import LaoCaiHeader from '../../components/laocai/LaoCaiHeader';
import LaoCaiFooter from '../../components/laocai/LaoCaiFooter';
import LegalAidPortalPage from '../../components/portal/specialized/LegalAidPortalPage';
import { laocaiProfile } from '../../data/portals/profiles';

// Chuyên trang dùng bộ khung chung (components/portal/specialized), nội dung theo hồ sơ Cổng
const LaoCaiLegalAidPage = () => <LegalAidPortalPage profile={laocaiProfile} Header={LaoCaiHeader} Footer={LaoCaiFooter} />;

export default LaoCaiLegalAidPage;

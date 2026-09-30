import React from 'react';
import Header from '../Header';
import { TUYENQUANG_SPECIAL_NAV, TQ_HOME } from '../../data/tuyenquangMockData';

const TuyenQuangHeader = () => (
    <Header
        title="CỔNG PHÁP LUẬT TỈNH TUYÊN QUANG"
        homeUrl={TQ_HOME}
        isSubSite={true}
        hideDraftNav={true}
        showMultimedia={true}
        specialNav={TUYENQUANG_SPECIAL_NAV}
    />
);

export default TuyenQuangHeader;

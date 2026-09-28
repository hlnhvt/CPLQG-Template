import React from 'react';
import Header from '../Header';
import { LAOCAI_V2_SPECIAL_NAV } from '../laocaiV2/LaoCaiV2Header';

const LaoCaiV3Header = () => {
    return (
        <Header
            title="CỔNG PHÁP LUẬT TỈNH LÀO CAI"
            homeUrl="/lao-cai-v3"
            isSubSite={true}
            hideDraftNav={true}
            showMultimedia={true}
            specialNav={LAOCAI_V2_SPECIAL_NAV}
        />
    );
};

export default LaoCaiV3Header;

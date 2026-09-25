import React from 'react';
import Header from '../Header';

const LaoCaiV2Header = () => {
    return (
        <Header
            title="CỔNG PHÁP LUẬT TỈNH LÀO CAI"
            homeUrl="/lao-cai-v2"
            isSubSite={true}
            hideDraftNav={true}
            showMultimedia={true}
        />
    );
};

export default LaoCaiV2Header;

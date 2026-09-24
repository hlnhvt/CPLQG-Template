import React from 'react';
import Header from '../Header';

const LaoCaiHeader = () => {
    return (
        <Header
            title="CỔNG PHÁP LUẬT TỈNH LÀO CAI"
            homeUrl="/lao-cai"
            isSubSite={true}
            hideDraftNav={true}
        />
    );
};

export default LaoCaiHeader;

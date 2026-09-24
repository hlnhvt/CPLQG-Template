import React from 'react';
import Header from '../Header';

const HanoiHeader = () => {
    return (
        <Header
            title="CỔNG PHÁP LUẬT THÀNH PHỐ HÀ NỘI"
            homeUrl="/ha-noi"
            isSubSite={true}
            hideDraftNav={true}
        />
    );
};

export default HanoiHeader;

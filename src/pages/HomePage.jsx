import React from 'react';
import Hero from '../components/Hero';
import NewlyIssuedDocs from '../components/NewlyIssuedDocs';
import PoliciesAndLife from '../components/PoliciesAndLife';
import EventsActivities from '../components/EventsActivities';
import LegalRadio from '../components/LegalRadio';
import LinkedPortals from '../components/LinkedPortals';

function HomePage() {
    return (
        <>
            <Hero />
            <div className="flex-grow">
                <NewlyIssuedDocs />
                <PoliciesAndLife />
                <EventsActivities />
                <LegalRadio />
                <LinkedPortals />
            </div>
        </>
    );
}

export default HomePage;

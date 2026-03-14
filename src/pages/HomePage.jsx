import React from 'react';
import Hero from '../components/Hero';
import NewlyIssuedDocs from '../components/NewlyIssuedDocs';
import PoliciesAndLife from '../components/PoliciesAndLife';
import EventsActivities from '../components/EventsActivities';
import LegalRadio from '../components/LegalRadio';
import LinkedPortals from '../components/LinkedPortals';
import RecommendedForYou from '../components/RecommendedForYou';
import { useAuth } from '../contexts/AuthContext';

function HomePage() {
    const { user } = useAuth();
    // In a real application, check if the user has configured preferences
    const hasConfiguredPrefs = true;

    return (
        <>
            <Hero />
            <div className="flex-grow">
                {(user && hasConfiguredPrefs) && <RecommendedForYou />}
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

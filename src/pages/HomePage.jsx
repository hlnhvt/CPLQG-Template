import React from 'react';
import Hero from '../components/Hero';
import NewlyIssuedDocs from '../components/NewlyIssuedDocs';
import PoliciesAndLife from '../components/PoliciesAndLife';
import EventsActivities from '../components/EventsActivities';
import Multimedia from '../components/Multimedia';
import LinkedPortals from '../components/LinkedPortals';
import RecommendedForYou from '../components/RecommendedForYou';
import FixedBottomCarousel from '../components/FixedBottomCarousel';
import NewsHighlightsHome from '../components/NewsHighlightsHome';
import { useAuth } from '../contexts/AuthContext';

function HomePage() {
    const { user } = useAuth();
    // In a real application, check if the user has configured preferences
    const hasConfiguredPrefs = true;

    return (
        <>
            <Hero />
            <div className="flex-grow bg-white">
                {/* {(user && hasConfiguredPrefs) && <RecommendedForYou />} */}
                <NewlyIssuedDocs />
                <NewsHighlightsHome />
                <PoliciesAndLife />
                <Multimedia />
                <EventsActivities />
                <LinkedPortals />
            </div>
            <FixedBottomCarousel />
        </>
    );
}

export default HomePage;

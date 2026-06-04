import React from 'react';
import Hero from '../components/Hero';
import NewlyIssuedDocsV2 from '../components/NewlyIssuedDocsV2';
import PoliciesAndLifeV2 from '../components/PoliciesAndLifeV2';
import EventsActivities from '../components/EventsActivities';
import MultimediaV2 from '../components/MultimediaV2';
import LinkedPortals from '../components/LinkedPortals';
import RecommendedForYou from '../components/RecommendedForYou';
import FixedBottomCarousel from '../components/FixedBottomCarousel';
import NewsHighlightsHome from '../components/NewsHighlightsHome';
import TotalReviewSection from '../components/TotalReviewSection';
import AppLauncherSection from '../components/AppLauncherSection';
import PhanAnhKienNghiHomeSection from '../components/PhanAnhKienNghiHomeSection';
import { useAuth } from '../contexts/AuthContext';

function HomePageV2() {
    const { user } = useAuth();
    // In a real application, check if the user has configured preferences
    const hasConfiguredPrefs = true;

    return (
        <>
            <Hero isV2={true} />
            <div className="flex-grow bg-white">
                {/* {(user && hasConfiguredPrefs) && <RecommendedForYou />} */}
                <NewlyIssuedDocsV2 />
                <AppLauncherSection />
                <NewsHighlightsHome />
                
                <MultimediaV2 />
                
                {/* Unified Row: Chính sách & Cuộc sống (60%) and Tổng rà soát (40%) */}
                <section className="py-10 bg-slate-50 relative overflow-hidden">
                    {/* Background vector detail */}
                    <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-slate-100/50 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 -z-10"></div>
                    <div className="container mx-auto px-4 max-w-[1504px]">
                        <div className="flex flex-col lg:flex-row gap-10 items-stretch">
                            <div className="w-full lg:w-[60%] flex flex-col">
                                <PoliciesAndLifeV2 isHalfWidth={true} />
                            </div>
                            <div className="w-full lg:w-[40%] flex flex-col">
                                <TotalReviewSection isHalfWidth={true} />
                            </div>
                        </div>
                    </div>
                </section>

                <PhanAnhKienNghiHomeSection />
                {/* <EventsActivities /> */}
                <LinkedPortals />
            </div>
            <FixedBottomCarousel />
        </>
    );
}

export default HomePageV2;

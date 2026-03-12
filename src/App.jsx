import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import NewsDetailPage from './pages/NewsDetailPage';
import AboutPage from './pages/AboutPage';
import VisionPage from './pages/VisionPage';
import NewsHighlightsPage from './pages/NewsHighlightsPage';
import ContactPage from './pages/ContactPage';
import SurveyTopicsPage from './pages/SurveyTopicsPage';
import SurveyListPage from './pages/SurveyListPage';
import SurveyDetailPage from './pages/SurveyDetailPage';
import SurveyFormPage from './pages/SurveyFormPage';
import LoginPage from './pages/LoginPage';
import SuccessStoriesPage from './pages/SuccessStoriesPage';
import SuccessStoryDetailPage from './pages/SuccessStoryDetailPage';

function App() {
    return (
        <Router>
            <AuthProvider>
                <div className="min-h-screen flex flex-col font-sans bg-[#f4f7fb]">
                    <Header />
                    <main className="flex-grow">
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/news/:id" element={<NewsDetailPage />} />
                            <Route path="/gioi-thieu" element={<AboutPage />} />
                            <Route path="/tam-nhin" element={<VisionPage />} />
                            <Route path="/tin-tuc/noi-bat" element={<NewsHighlightsPage />} />
                            <Route path="/lien-he" element={<ContactPage />} />
                            <Route path="/chu-de-khao-sat" element={<SurveyTopicsPage />} />
                            <Route path="/chu-de-khao-sat/:id" element={<SurveyListPage />} />
                            <Route path="/khao-sat/:surveyId" element={<SurveyDetailPage />} />
                            <Route path="/khao-sat/:surveyId/tham-gia" element={<SurveyFormPage />} />
                            {/* Login page - no Header/Footer */}
                            <Route path="/dang-nhap" element={<LoginPage />} />
                            <Route path="/cau-chuyen-thanh-cong" element={<SuccessStoriesPage />} />
                            <Route path="/cau-chuyen-thanh-cong/:id" element={<SuccessStoryDetailPage />} />
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </AuthProvider>
        </Router>
    );
}

export default App;

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
import PhotoGalleryPage from './pages/PhotoGalleryPage';
import PhotoDetailPage from './pages/PhotoDetailPage';
import VideoGalleryPage from './pages/VideoGalleryPage';
import VideoDetailPage from './pages/VideoDetailPage';
import InfographicPage from './pages/InfographicPage';
import InfographicDetailPage from './pages/InfographicDetailPage';
import VanBanHieuLucPage from './pages/VanBanHieuLucPage';
import VanBanHetHieuLucPage from './pages/VanBanHetHieuLucPage';
import VanBanMoiPage from './pages/VanBanMoiPage';
import VanBanChuYPage from './pages/VanBanChuYPage';
import VanBanQPPLPage from './pages/VanBanQPPLPage';
import VanBanDetailPage from './pages/VanBanDetailPage';
import DuThaoPage from './pages/DuThaoPage';
import DuThaoDetailPage from './pages/DuThaoDetailPage';
import BaoCaoTiepThuDetailPage from './pages/BaoCaoTiepThuDetailPage';

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
                            <Route path="/anh" element={<PhotoGalleryPage />} />
                            <Route path="/anh/:id" element={<PhotoDetailPage />} />
                            <Route path="/video" element={<VideoGalleryPage />} />
                            <Route path="/video/:id" element={<VideoDetailPage />} />
                            <Route path="/infographic" element={<InfographicPage />} />
                            <Route path="/infographic/:slug" element={<InfographicDetailPage />} />
                            <Route path="/van-ban/hieu-luc" element={<VanBanHieuLucPage />} />
                            <Route path="/van-ban/het-hieu-luc" element={<VanBanHetHieuLucPage />} />
                            <Route path="/van-ban/moi-ban-hanh" element={<VanBanMoiPage />} />
                            <Route path="/van-ban/chu-y" element={<VanBanChuYPage />} />
                            <Route path="/van-ban/tim-kiem" element={<VanBanQPPLPage />} />
                            <Route path="/van-ban/:id" element={<VanBanDetailPage />} />
                            <Route path="/du-thao" element={<DuThaoPage />} />
                            <Route path="/du-thao/:id" element={<DuThaoDetailPage />} />
                            <Route path="/bao-cao-tiep-thu/:id" element={<BaoCaoTiepThuDetailPage />} />
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </AuthProvider>
        </Router>
    );
}

export default App;

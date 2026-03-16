import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import UserDashboardLayout from './layouts/UserDashboardLayout';
import ProfilePage from './pages/dashboard/ProfilePage';
import CollectionsPage from './pages/dashboard/CollectionsPage';
import CollectionDetailPage from './pages/dashboard/CollectionDetailPage';
import NotificationCenterPage from './pages/dashboard/NotificationCenterPage';
import NotificationDetailPage from './pages/dashboard/NotificationDetailPage';
import NotificationSettingsPage from './pages/dashboard/NotificationSettingsPage';
import CollaboratorRegistrationPage from './pages/collaborator/CollaboratorRegistrationPage';
import NewsletterRegistrationPage from './pages/NewsletterRegistrationPage';
import NewsDetailPage from './pages/NewsDetailPage';
import AboutPage from './pages/AboutPage';
import VisionPage from './pages/VisionPage';
import NewsHighlightsPage from './pages/NewsHighlightsPage';
import ContactPage from './pages/ContactPage';
import SurveyTopicsPage from './pages/SurveyTopicsPage';
import SurveyGlobalPage from './pages/SurveyGlobalPage';
import SurveyTopicDetailPage from './pages/SurveyTopicDetailPage';
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
import UserHomePage from './pages/dashboard/UserHomePage';
import UserSettingsPage from './pages/dashboard/UserSettingsPage';
import UserHistoryPage from './pages/dashboard/UserHistoryPage';
import CollaboratorArticlesPage from './pages/collaborator/CollaboratorArticlesPage';
import CollaboratorArticleEditor from './pages/collaborator/CollaboratorArticleEditor';
import RecommendedPage from './pages/RecommendedPage';

// Forum imports
import ForumListPage from './pages/forum/ForumListPage';
import ForumDashboardPage from './pages/forum/ForumDashboardPage';
import ForumTopicListPage from './pages/forum/ForumTopicListPage';
import TopicDetailPage from './pages/forum/TopicDetailPage';
import CreateTopicPage from './pages/forum/CreateTopicPage';
import LivestreamEventPage from './pages/forum/LivestreamEventPage';
import ForumTopicManagementPage from './pages/forum/ForumTopicManagementPage';

// Onboarding import
import OnboardingPage from './pages/onboarding/OnboardingPage';

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
                            <Route path="/chu-de-khao-sat/:id" element={<SurveyTopicDetailPage />} />
                            <Route path="/ban-tin/dang-ky" element={<NewsletterRegistrationPage />} />
                            <Route path="/khao-sat" element={<SurveyGlobalPage />} />
                            <Route path="/khao-sat/:surveyId" element={<SurveyDetailPage />} />
                            <Route path="/khao-sat/:surveyId/tham-gia" element={<SurveyFormPage />} />
                            <Route path="/danh-cho-ban" element={<RecommendedPage />} />
                            {/* Login page / Onboarding - no Header/Footer */}
                            <Route path="/dang-nhap" element={<LoginPage />} />
                            <Route path="/onboarding" element={<OnboardingPage />} />
                            
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

                            {/* Forum Routes */}
                            <Route path="/dien-dan" element={<ForumListPage />} />
                            <Route path="/dien-dan/thong-ke" element={<ForumDashboardPage />} />
                            <Route path="/dien-dan/chu-de/:id" element={<ForumTopicListPage />} />
                            <Route path="/dien-dan/bai-viet/:id" element={<TopicDetailPage />} />
                            <Route path="/dien-dan/tao-moi" element={<CreateTopicPage />} />
                            <Route path="/dien-dan/su-kien/:slug" element={<LivestreamEventPage />} />

                            {/* Dashboard Portal Routes */}
                            <Route path="/ca-nhan" element={<UserDashboardLayout />}>
                                <Route path="trang-chu" element={<UserHomePage />} />
                                <Route path="ho-so" element={<ProfilePage />} />
                                <Route path="cai-dat" element={<UserSettingsPage />} />
                                <Route path="lich-su" element={<UserHistoryPage />} />
                                <Route path="bo-suu-tap" element={<CollectionsPage />} />
                                <Route path="bo-suu-tap/:id" element={<CollectionDetailPage />} />
                                <Route path="thong-bao" element={<NotificationCenterPage />} />
                                <Route path="thong-bao/:id" element={<NotificationDetailPage />} />
                                <Route path="cai-dat-thong-bao" element={<NotificationSettingsPage />} />
                                <Route path="dang-ky-cong-tac-vien" element={<CollaboratorRegistrationPage />} />
                                <Route path="tin-bai" element={<CollaboratorArticlesPage />} />
                                <Route path="chu-de-dien-dan" element={<ForumTopicManagementPage />} />
                            </Route>

                            {/* Full-screen Editor Routes */}
                            <Route path="/ca-nhan/tin-bai/tao-moi" element={<CollaboratorArticleEditor />} />
                            <Route path="/ca-nhan/tin-bai/:id/sua" element={<CollaboratorArticleEditor />} />
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </AuthProvider>
        </Router>
    );
}

export default App;

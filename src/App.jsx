import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
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
import ChucNangNhiemVuPage from './pages/gioi-thieu/ChucNangNhiemVuPage';
import ThuNgoPage from './pages/gioi-thieu/ThuNgoPage';
import UserManualArticlePage from './pages/huong-dan-su-dung/UserManualArticlePage';
import UserManualDocListPage from './pages/huong-dan-su-dung/UserManualDocListPage';
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
import NghienCuuTraoDoiPage from './pages/tin-tuc/NghienCuuTraoDoiPage';
import NghienCuuTraoDoiDetailPage from './pages/tin-tuc/NghienCuuTraoDoiDetailPage';

// Forum imports
import ForumListPage from './pages/forum/ForumListPage';
import ForumDashboardPage from './pages/forum/ForumDashboardPage';
import ForumTopicListPage from './pages/forum/ForumTopicListPage';
import TopicDetailPage from './pages/forum/TopicDetailPage';
import CreateTopicPage from './pages/forum/CreateTopicPage';
import LivestreamEventPage from './pages/forum/LivestreamEventPage';
import ForumTopicManagementPage from './pages/forum/ForumTopicManagementPage';
import LivestreamListPage from './pages/forum/LivestreamListPage';
import CreateContributionPage from './pages/forum/CreateContributionPage';
import ContributionDetailPage from './pages/forum/ContributionDetailPage';
import FollowedForumsPage from './pages/dashboard/FollowedForumsPage';

// Legal Questions imports
import DanhSachCauHoiPage from './pages/cau-hoi-phap-luat/DanhSachCauHoiPage';
import CauHoiDetailPage from './pages/cau-hoi-phap-luat/CauHoiDetailPage';
import ChuyenGiaListPage from './pages/cau-hoi-phap-luat/ChuyenGiaListPage';
import ChuyenGiaDetailPage from './pages/cau-hoi-phap-luat/ChuyenGiaDetailPage';
import DatLichTuVanPage from './pages/cau-hoi-phap-luat/DatLichTuVanPage';

// Legal Questions Dashboard imports
import DanhSachCauHoiCaNhanPage from './pages/dashboard/DanhSachCauHoiCaNhanPage';
import CauHoiCaNhanDetailPage from './pages/dashboard/CauHoiCaNhanDetailPage';

// Onboarding import
import OnboardingPage from './pages/onboarding/OnboardingPage';

// Phan Anh Kien Nghi imports
import PhanAnhKienNghiPage from './pages/phan-anh-kien-nghi/PhanAnhKienNghiPage';
import PhanAnhKienNghiGuidePage from './pages/phan-anh-kien-nghi/PhanAnhKienNghiGuidePage';
import PhanAnhKienNghiDetailPage from './pages/phan-anh-kien-nghi/PhanAnhKienNghiDetailPage';
import CreatePhanAnhKienNghiPage from './pages/phan-anh-kien-nghi/CreatePhanAnhKienNghiPage';

// Tong Ra Soat import
import TongRaSoatPage from './pages/TongRaSoatPage';
import TongRaSoatDocDetailPage from './pages/tong-ra-soat/TongRaSoatDocDetailPage';
import TongRaSoatNewsDetailPage from './pages/tong-ra-soat/TongRaSoatNewsDetailPage';

// Legal Aid imports
import GioiThieuTGPLPage from './pages/tro-giup-phap-ly/GioiThieuTGPLPage';
import LichSuPhatTrienTGPLPage from './pages/tro-giup-phap-ly/LichSuPhatTrienTGPLPage';
import ChucNangNhiemVuTGPLPage from './pages/tro-giup-phap-ly/ChucNangNhiemVuTGPLPage';
import CoCauToChucTGPLPage from './pages/tro-giup-phap-ly/CoCauToChucTGPLPage';
import DanhBaDienTuTGPLPage from './pages/tro-giup-phap-ly/DanhBaDienTuTGPLPage';
import VideoPhongSuTGPLPage from './pages/tro-giup-phap-ly/VideoPhongSuTGPLPage';
import TinTucHoatDongTGPLPage from './pages/tro-giup-phap-ly/TinTucHoatDongTGPLPage';
import AnPhamTGPLPage from './pages/tro-giup-phap-ly/AnPhamTGPLPage';
import ThongTinDieuHanhTGPLPage from './pages/tro-giup-phap-ly/ThongTinDieuHanhTGPLPage';
import HuongDanNghiepVuTGPLPage from './pages/tro-giup-phap-ly/HuongDanNghiepVuTGPLPage';
import NghienCuuTraoDoiTGPLPage from './pages/tro-giup-phap-ly/NghienCuuTraoDoiTGPLPage';
import DanhSachToChucTGPLPage from './pages/tro-giup-phap-ly/DanhSachToChucTGPLPage';
import ToChucTGPLDetailPage from './pages/tro-giup-phap-ly/ToChucTGPLDetailPage';
import DanhSachNguoiThucHienTGPLPage from './pages/tro-giup-phap-ly/DanhSachNguoiThucHienTGPLPage';
import NguoiThucHienTGPLDetailPage from './pages/tro-giup-phap-ly/NguoiThucHienTGPLDetailPage';
import BaoCaoCongTacTGPLPage from './pages/tro-giup-phap-ly/BaoCaoCongTacTGPLPage';
import VuViecDienHinhTGPLPage from './pages/tro-giup-phap-ly/VuViecDienHinhTGPLPage';


const AppLayout = () => {
    const location = useLocation();
    const hideHeaderFooter = ['/dang-nhap', '/onboarding'].includes(location.pathname);

    return (
        <div className="min-h-screen flex flex-col font-sans transition-colors duration-200">
            {!hideHeaderFooter && <Header />}
            <main className="flex-grow">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/news/:id" element={<NewsDetailPage />} />
                    <Route path="/gioi-thieu" element={<AboutPage />} />
                    <Route path="/gioi-thieu/chuc-nang-nhiem-vu" element={<ChucNangNhiemVuPage />} />
                    <Route path="/tam-nhin" element={<VisionPage />} />
                    <Route path="/gioi-thieu/thu-ngo" element={<ThuNgoPage />} />
                    <Route path="/huong-dan-su-dung" element={<UserManualDocListPage />} />
                    <Route path="/huong-dan-su-dung/bai-viet/:id" element={<UserManualArticlePage />} />
                    <Route path="/tin-tuc/noi-bat" element={<NewsHighlightsPage />} />
                    <Route path="/tin-tuc/nghien-cuu-trao-doi" element={<NghienCuuTraoDoiPage />} />
                    <Route path="/tin-tuc/nghien-cuu-trao-doi/:id" element={<NghienCuuTraoDoiDetailPage />} />
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

                    {/* Feedback Routes */}
                    <Route path="/phan-anh-kien-nghi" element={<PhanAnhKienNghiPage />} />
                    <Route path="/phan-anh-kien-nghi/huong-dan" element={<PhanAnhKienNghiGuidePage />} />
                    <Route path="/phan-anh-kien-nghi/tao-moi" element={<CreatePhanAnhKienNghiPage />} />
                    <Route path="/phan-anh-kien-nghi/:id" element={<PhanAnhKienNghiDetailPage />} />

                    {/* Tong Ra Soat Route */}
                    <Route path="/tong-ra-soat" element={<TongRaSoatPage />} />
                    <Route path="/tong-ra-soat/van-ban/:id" element={<TongRaSoatDocDetailPage />} />
                    <Route path="/tong-ra-soat/tin-tuc/:id" element={<TongRaSoatNewsDetailPage />} />

                    {/* Legal Aid Routes */}
                    <Route path="/tro-giup-phap-ly" element={<GioiThieuTGPLPage />} />
                    <Route path="/tro-giup-phap-ly/lich-su-phat-trien" element={<LichSuPhatTrienTGPLPage />} />
                    <Route path="/tro-giup-phap-ly/chuc-nang-nhiem-vu" element={<ChucNangNhiemVuTGPLPage />} />
                    <Route path="/tro-giup-phap-ly/co-cau-to-chuc" element={<CoCauToChucTGPLPage />} />
                    <Route path="/tro-giup-phap-ly/danh-ba" element={<DanhBaDienTuTGPLPage />} />
                    <Route path="/tro-giup-phap-ly/video" element={<VideoPhongSuTGPLPage />} />
                    <Route path="/tro-giup-phap-ly/tin-tuc" element={<TinTucHoatDongTGPLPage />} />
                    <Route path="/tro-giup-phap-ly/an-pham" element={<AnPhamTGPLPage />} />
                    <Route path="/tro-giup-phap-ly/chi-dao-dieu-hanh" element={<ThongTinDieuHanhTGPLPage />} />
                    <Route path="/tro-giup-phap-ly/huong-dan-nghiep-vu" element={<HuongDanNghiepVuTGPLPage />} />
                    <Route path="/tro-giup-phap-ly/nghien-cuu-trao-doi" element={<NghienCuuTraoDoiTGPLPage />} />
                    <Route path="/tro-giup-phap-ly/to-chuc" element={<DanhSachToChucTGPLPage />} />
                    <Route path="/tro-giup-phap-ly/to-chuc/:id" element={<ToChucTGPLDetailPage />} />
                    <Route path="/tro-giup-phap-ly/nguoi-thuc-hien" element={<DanhSachNguoiThucHienTGPLPage />} />
                    <Route path="/tro-giup-phap-ly/nguoi-thuc-hien/:id" element={<NguoiThucHienTGPLDetailPage />} />
                    <Route path="/tro-giup-phap-ly/bao-cao-cong-tac" element={<BaoCaoCongTacTGPLPage />} />
                    <Route path="/tro-giup-phap-ly/vu-viec-dien-hinh" element={<VuViecDienHinhTGPLPage />} />

                    {/* Forum Routes */}
                    <Route path="/dien-dan" element={<ForumListPage />} />
                    <Route path="/dien-dan/thong-ke" element={<ForumDashboardPage />} />
                    <Route path="/dien-dan/chu-de/:id" element={<ForumTopicListPage />} />
                    <Route path="/dien-dan/chu-de/:id/tao-gop-y" element={<CreateContributionPage />} />
                    <Route path="/dien-dan/bai-viet/:id" element={<TopicDetailPage />} />
                    <Route path="/dien-dan/gop-y/:id" element={<ContributionDetailPage />} />
                    <Route path="/dien-dan/tao-moi" element={<CreateTopicPage />} />
                    <Route path="/dien-dan/su-kien" element={<LivestreamListPage />} />
                    <Route path="/dien-dan/su-kien/:slug" element={<LivestreamEventPage />} />

                    {/* Legal Questions Routes */}
                    <Route path="/cau-hoi-phap-luat" element={<DanhSachCauHoiPage />} />
                    <Route path="/cau-hoi-phap-luat/:id" element={<CauHoiDetailPage />} />
                    <Route path="/cau-hoi-phap-luat/chuyen-gia" element={<ChuyenGiaListPage />} />
                    <Route path="/cau-hoi-phap-luat/chuyen-gia/:id" element={<ChuyenGiaDetailPage />} />
                    <Route path="/cau-hoi-phap-luat/chuyen-gia/:id/dat-lich" element={<DatLichTuVanPage />} />

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
                        <Route path="dien-dan-quan-tam" element={<FollowedForumsPage />} />
                        <Route path="cau-hoi-ca-nhan" element={<DanhSachCauHoiCaNhanPage />} />
                        <Route path="cau-hoi-ca-nhan/:id" element={<CauHoiCaNhanDetailPage />} />
                    </Route>

                    {/* Full-screen Editor Routes */}
                    <Route path="/ca-nhan/tin-bai/tao-moi" element={<CollaboratorArticleEditor />} />
                    <Route path="/ca-nhan/tin-bai/:id/sua" element={<CollaboratorArticleEditor />} />
                </Routes>
            </main>
            {!hideHeaderFooter && <Footer />}
        </div>
    );
};

function App() {
    return (
        <Router>
            <ThemeProvider>
                <AuthProvider>
                    <AppLayout />
                </AuthProvider>
            </ThemeProvider>
        </Router>
    );
}

export default App;

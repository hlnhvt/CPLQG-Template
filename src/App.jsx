import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import HomePageV2 from './pages/HomePageV2';
import HomePageV3 from './pages/HomePageV3';
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
import VanHoaThuongTonPhapLuatPage from './pages/VanHoaThuongTonPhapLuatPage';
import VanHoaSubCategoryPage from './pages/VanHoaSubCategoryPage';
import ContactUsPage from './pages/ContactUsPage';
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
import LegalRadio from './components/LegalRadio';
import VanBanHieuLucPage from './pages/VanBanHieuLucPage';
import VanBanHetHieuLucPage from './pages/VanBanHetHieuLucPage';
import VanBanMoiPage from './pages/VanBanMoiPage';
import VanBanChuYPage from './pages/VanBanChuYPage';
import VanBanQPPLPage from './pages/VanBanQPPLPage';
import VanBanDetailPage from './pages/VanBanDetailPage';
import VanBanHomePage from './pages/VanBanHomePage';
import PublicUserProfilePage from './pages/PublicUserProfilePage';
import DuThaoPage from './pages/DuThaoPage';
import HienKePage from './pages/HienKePage';
import HienKeDetailPage from './pages/HienKeDetailPage';
import DuThaoDetailPage from './pages/DuThaoDetailPage';
import ConsultFeedbackPage from './pages/ConsultFeedbackPage';
import SimpleFeedbackPage from './pages/SimpleFeedbackPage';
import BaoCaoTiepThuDetailPage from './pages/BaoCaoTiepThuDetailPage';
import UserHomePage from './pages/dashboard/UserHomePage';
import UserSettingsPage from './pages/dashboard/UserSettingsPage';
import UserHistoryPage from './pages/dashboard/UserHistoryPage';
import CollaboratorArticlesPage from './pages/collaborator/CollaboratorArticlesPage';
import CollaboratorArticleEditor from './pages/collaborator/CollaboratorArticleEditor';
import RecommendedPage from './pages/RecommendedPage';
import NghienCuuTraoDoiPage from './pages/tin-tuc/NghienCuuTraoDoiPage';
import NghienCuuTraoDoiDetailPage from './pages/tin-tuc/NghienCuuTraoDoiDetailPage';
import ToaDamSuKienPage from './pages/tin-tuc/ToaDamSuKienPage';
import ToaDamSuKienDetailPage from './pages/tin-tuc/ToaDamSuKienDetailPage';

import HienKeDoiSongPage from './pages/HienKeDoiSongPage';
import HienKeNoiBatPage from './pages/HienKeNoiBatPage';
import HienKeNoiBatV2Page from './pages/HienKeNoiBatV2Page';
import HienKeLinhVucPage from './pages/HienKeLinhVucPage';
import HienKeLinhVucDanhSachPage from './pages/HienKeLinhVucDanhSachPage';
import HienKeFeedbackPage from './pages/HienKeFeedbackPage';
import HienKeQuyTrinhPage from './pages/HienKeQuyTrinhPage';

// Forum imports
import ForumListPage from './pages/forum/ForumListPage';
import ForumDashboardPage from './pages/forum/ForumDashboardPage';
import ForumTopicListPage from './pages/forum/ForumTopicListPage';
import TopicDetailPage from './pages/forum/TopicDetailPage';
import CreateTopicPage from './pages/forum/CreateTopicPage';
import UpdateTopicPage from './pages/forum/UpdateTopicPage';
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
import ChuDeHoiDapPage from './pages/cau-hoi-phap-luat/ChuDeHoiDapPage';

// Legal Questions Dashboard imports
import DanhSachCauHoiCaNhanPage from './pages/dashboard/DanhSachCauHoiCaNhanPage';
import CauHoiCaNhanDetailPage from './pages/dashboard/CauHoiCaNhanDetailPage';
import UserPetitionsPage from './pages/dashboard/UserPetitionsPage';
import UserHienKePage from './pages/dashboard/UserHienKePage';

// Onboarding import
import OnboardingPage from './pages/onboarding/OnboardingPage';

// Ho tro phap ly doanh nghiep import
import HoTroPhapLyDoanhNghiepPage from './pages/ho-tro-phap-ly-doanh-nghiep/HoTroPhapLyDoanhNghiepPage';
import HoTroPhapLyDNPage from './pages/ho-tro-phap-ly-dn/HoTroPhapLyDNPage';

// Pho bien giao duc phap luat import
import PhoBienGiaoDucPhapLuatPage from './pages/pho-bien-giao-duc/PhoBienGiaoDucPhapLuatPage';
import PhoBienGiaoDucPhapLuatPageBackup from './pages/pho-bien-giao-duc/PhoBienGiaoDucPhapLuatPageBackup';
import PBGDPLNewsDetailPage from './pages/pho-bien-giao-duc/PBGDPLNewsDetailPage';


// Phan Anh Kien Nghi imports
import PhanAnhKienNghiPage from './pages/phan-anh-kien-nghi/PhanAnhKienNghiPage';
import PhanAnhKienNghiGuidePage from './pages/phan-anh-kien-nghi/PhanAnhKienNghiGuidePage';
import PhanAnhKienNghiDetailPage from './pages/phan-anh-kien-nghi/PhanAnhKienNghiDetailPage';
import CreatePhanAnhKienNghiPage from './pages/phan-anh-kien-nghi/CreatePhanAnhKienNghiPage';

// Tong Ra Soat import
import TongRaSoatPage from './pages/TongRaSoatPage';
import TongRaSoatDocDetailPage from './pages/tong-ra-soat/TongRaSoatDocDetailPage';
import TongRaSoatNewsDetailPage from './pages/tong-ra-soat/TongRaSoatNewsDetailPage';
import TongRaSoatAIDetailPage from './pages/tong-ra-soat/TongRaSoatAIDetailPage';

// Nghi Quyet 66
import NghiQuyet66Page from './pages/NghiQuyet66Page';

// Legal Aid imports
import GioiThieuTGPLPage from './pages/tro-giup-phap-ly/GioiThieuTGPLPage';
import LichSuPhatTrienTGPLPage from './pages/tro-giup-phap-ly/LichSuPhatTrienTGPLPage';
import ChucNangNhiemVuTGPLPage from './pages/tro-giup-phap-ly/ChucNangNhiemVuTGPLPage';
import CoCauToChucTGPLPage from './pages/tro-giup-phap-ly/CoCauToChucTGPLPage';
import CoCauToChucTGPLDetailPage from './pages/tro-giup-phap-ly/CoCauToChucTGPLDetailPage';
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
import VuViecDienHinhDetailPage from './pages/tro-giup-phap-ly/VuViecDienHinhDetailPage';
import BanVaTGPLPage from './pages/tro-giup-phap-ly/BanVaTGPLPage';
import HopTacQuocTeTGPLPage from './pages/tro-giup-phap-ly/HopTacQuocTeTGPLPage';
import KinhNghiemQuocTeTGPLPage from './pages/tro-giup-phap-ly/KinhNghiemQuocTeTGPLPage';
import AlbumAnhTGPLPage from './pages/tro-giup-phap-ly/AlbumAnhTGPLPage';
import AlbumAnhTGPLDetailPage from './pages/tro-giup-phap-ly/AlbumAnhTGPLDetailPage';
import VideoTGPLPage from './pages/tro-giup-phap-ly/VideoTGPLPage';
import VideoTGPLDetailPage from './pages/tro-giup-phap-ly/VideoTGPLDetailPage';
import UnsubscribeNewsletterPage from './pages/UnsubscribeNewsletterPage';
import OfficerDashboardLayout from './layouts/OfficerDashboardLayout';
import OfficerHomePage from './pages/dashboard/OfficerHomePage';
import OfficerProfilePage from './pages/dashboard/OfficerProfilePage';
import OfficerSettingsPage from './pages/dashboard/OfficerSettingsPage';
import OfficerHienKePage from './pages/dashboard/OfficerHienKePage';
import OfficerHienKeDetailPage from './pages/dashboard/OfficerHienKeDetailPage';
import HanoiHomePage from './pages/hanoi/HanoiHomePage';
import HanoiAboutPage from './pages/hanoi/HanoiAboutPage';
import HanoiLegalDocsPage from './pages/hanoi/HanoiLegalDocsPage';
import HanoiDraftDocsPage from './pages/hanoi/HanoiDraftDocsPage';
import HanoiLawDisseminationPage from './pages/hanoi/HanoiLawDisseminationPage';
import HanoiLegalAidPage from './pages/hanoi/HanoiLegalAidPage';
import HanoiBusinessSupportPage from './pages/hanoi/HanoiBusinessSupportPage';
import HanoiBusinessFAQDetailPage from './pages/hanoi/HanoiBusinessFAQDetailPage';
import HanoiContactPage from './pages/hanoi/HanoiContactPage';
import HanoiNewsPage from './pages/hanoi/HanoiNewsPage';
import HanoiFAQPage from './pages/hanoi/HanoiFAQPage';
import HanoiFAQDetailPage from './pages/hanoi/HanoiFAQDetailPage';
import HanoiNewsCategoryPage from './pages/hanoi/HanoiNewsCategoryPage';
import HanoiHotlinePage from './pages/hanoi/HanoiHotlinePage';
import LaoCaiHomePage from './pages/laocai/LaoCaiHomePage';
import LaoCaiAboutPage from './pages/laocai/LaoCaiAboutPage';
import LaoCaiLegalDocsPage from './pages/laocai/LaoCaiLegalDocsPage';
import LaoCaiDraftDocsPage from './pages/laocai/LaoCaiDraftDocsPage';
import LaoCaiLawDisseminationPage from './pages/laocai/LaoCaiLawDisseminationPage';
import LaoCaiLegalAidPage from './pages/laocai/LaoCaiLegalAidPage';
import LaoCaiBusinessSupportPage from './pages/laocai/LaoCaiBusinessSupportPage';
import LaoCaiBusinessFAQDetailPage from './pages/laocai/LaoCaiBusinessFAQDetailPage';
import LaoCaiContactPage from './pages/laocai/LaoCaiContactPage';
import LaoCaiNewsPage from './pages/laocai/LaoCaiNewsPage';
import LaoCaiFAQPage from './pages/laocai/LaoCaiFAQPage';
import LaoCaiFAQDetailPage from './pages/laocai/LaoCaiFAQDetailPage';
import LaoCaiNewsCategoryPage from './pages/laocai/LaoCaiNewsCategoryPage';
import LaoCaiHotlinePage from './pages/laocai/LaoCaiHotlinePage';
import LaoCaiV2HomePage from './pages/laocaiV2/LaoCaiV2HomePage';
import LaoCaiV2AboutPage from './pages/laocaiV2/LaoCaiV2AboutPage';
import LaoCaiV2LegalDocsPage from './pages/laocaiV2/LaoCaiV2LegalDocsPage';
import LaoCaiV2DraftDocsPage from './pages/laocaiV2/LaoCaiV2DraftDocsPage';
import LaoCaiV2ContactPage from './pages/laocaiV2/LaoCaiV2ContactPage';
import LaoCaiV2NewsPage from './pages/laocaiV2/LaoCaiV2NewsPage';
import LaoCaiV2FAQPage from './pages/laocaiV2/LaoCaiV2FAQPage';
import LaoCaiV2FAQDetailPage from './pages/laocaiV2/LaoCaiV2FAQDetailPage';
import LaoCaiV2NewsCategoryPage from './pages/laocaiV2/LaoCaiV2NewsCategoryPage';
import LaoCaiV2HotlinePage from './pages/laocaiV2/LaoCaiV2HotlinePage';
import LaoCaiV2SpecializedLayout from './components/laocaiV2/LaoCaiV2SpecializedLayout';
import LaoCaiV2LegalLibraryPage from './pages/laocaiV2/LaoCaiV2LegalLibraryPage';
import LaoCaiV2MultimediaPage from './pages/laocaiV2/LaoCaiV2MultimediaPage';
import LaoCaiV2PhoBienGiaoDucPage from './pages/laocaiV2/pho-bien-giao-duc/PhoBienGiaoDucPhapLuatPage';
import LaoCaiV2PBGDPLNewsDetailPage from './pages/laocaiV2/pho-bien-giao-duc/PBGDPLNewsDetailPage';
import LaoCaiV2HoTroPhapLyDoanhNghiepPage from './pages/laocaiV2/ho-tro-phap-ly-doanh-nghiep/HoTroPhapLyDoanhNghiepPage';
import LaoCaiV2_LichSuPhatTrienTGPLPage from './pages/laocaiV2/tro-giup-phap-ly/LichSuPhatTrienTGPLPage';
import LaoCaiV2_ChucNangNhiemVuTGPLPage from './pages/laocaiV2/tro-giup-phap-ly/ChucNangNhiemVuTGPLPage';
import LaoCaiV2_CoCauToChucTGPLPage from './pages/laocaiV2/tro-giup-phap-ly/CoCauToChucTGPLPage';
import LaoCaiV2_CoCauToChucTGPLDetailPage from './pages/laocaiV2/tro-giup-phap-ly/CoCauToChucTGPLDetailPage';
import LaoCaiV2_DanhBaDienTuTGPLPage from './pages/laocaiV2/tro-giup-phap-ly/DanhBaDienTuTGPLPage';
import LaoCaiV2_VideoPhongSuTGPLPage from './pages/laocaiV2/tro-giup-phap-ly/VideoPhongSuTGPLPage';
import LaoCaiV2_TinTucHoatDongTGPLPage from './pages/laocaiV2/tro-giup-phap-ly/TinTucHoatDongTGPLPage';
import LaoCaiV2_AnPhamTGPLPage from './pages/laocaiV2/tro-giup-phap-ly/AnPhamTGPLPage';
import LaoCaiV2_ThongTinDieuHanhTGPLPage from './pages/laocaiV2/tro-giup-phap-ly/ThongTinDieuHanhTGPLPage';
import LaoCaiV2_HuongDanNghiepVuTGPLPage from './pages/laocaiV2/tro-giup-phap-ly/HuongDanNghiepVuTGPLPage';
import LaoCaiV2_NghienCuuTraoDoiTGPLPage from './pages/laocaiV2/tro-giup-phap-ly/NghienCuuTraoDoiTGPLPage';
import LaoCaiV2_DanhSachToChucTGPLPage from './pages/laocaiV2/tro-giup-phap-ly/DanhSachToChucTGPLPage';
import LaoCaiV2_ToChucTGPLDetailPage from './pages/laocaiV2/tro-giup-phap-ly/ToChucTGPLDetailPage';
import LaoCaiV2_DanhSachNguoiThucHienTGPLPage from './pages/laocaiV2/tro-giup-phap-ly/DanhSachNguoiThucHienTGPLPage';
import LaoCaiV2_NguoiThucHienTGPLDetailPage from './pages/laocaiV2/tro-giup-phap-ly/NguoiThucHienTGPLDetailPage';
import LaoCaiV2_BaoCaoCongTacTGPLPage from './pages/laocaiV2/tro-giup-phap-ly/BaoCaoCongTacTGPLPage';
import LaoCaiV2_BanVaTGPLPage from './pages/laocaiV2/tro-giup-phap-ly/BanVaTGPLPage';
import LaoCaiV2_HopTacQuocTeTGPLPage from './pages/laocaiV2/tro-giup-phap-ly/HopTacQuocTeTGPLPage';
import LaoCaiV2_KinhNghiemQuocTeTGPLPage from './pages/laocaiV2/tro-giup-phap-ly/KinhNghiemQuocTeTGPLPage';
import LaoCaiV2_AlbumAnhTGPLPage from './pages/laocaiV2/tro-giup-phap-ly/AlbumAnhTGPLPage';
import LaoCaiV2_AlbumAnhTGPLDetailPage from './pages/laocaiV2/tro-giup-phap-ly/AlbumAnhTGPLDetailPage';
import LaoCaiV2_VideoTGPLPage from './pages/laocaiV2/tro-giup-phap-ly/VideoTGPLPage';
import LaoCaiV2_VideoTGPLDetailPage from './pages/laocaiV2/tro-giup-phap-ly/VideoTGPLDetailPage';
import LaoCaiV2_VuViecDienHinhTGPLPage from './pages/laocaiV2/tro-giup-phap-ly/VuViecDienHinhTGPLPage';
import LaoCaiV2_VuViecDienHinhDetailPage from './pages/laocaiV2/tro-giup-phap-ly/VuViecDienHinhDetailPage';

const AppLayout = () => {
    const location = useLocation();
    const hideHeaderFooter = ['/dang-nhap', '/onboarding'].includes(location.pathname) || location.pathname.startsWith('/ha-noi') || location.pathname.startsWith('/lao-cai');

    // Scroll to top on every route change
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, [location.pathname]);

    return (
        <div className="min-h-screen flex flex-col font-sans transition-colors duration-200">
            {!hideHeaderFooter && <Header />}
            <main className="flex-grow">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/ha-noi" element={<HanoiHomePage />} />
                    <Route path="/ha-noi/gioi-thieu" element={<HanoiAboutPage />} />
                    <Route path="/ha-noi/tin-tuc" element={<HanoiNewsPage />} />
                    <Route path="/ha-noi/tin-tuc/:categorySlug" element={<HanoiNewsCategoryPage />} />
                    <Route path="/ha-noi/van-ban" element={<HanoiLegalDocsPage />} />
                    <Route path="/ha-noi/du-thao" element={<HanoiDraftDocsPage />} />
                    <Route path="/ha-noi/pho-bien-giao-duc" element={<HanoiLawDisseminationPage />} />
                    <Route path="/ha-noi/tro-giup-phap-ly" element={<HanoiLegalAidPage />} />
                    <Route path="/ha-noi/ho-tro-phap-ly-doanh-nghiep" element={<HanoiBusinessSupportPage />} />
                    <Route path="/ha-noi/ho-tro-phap-ly-doanh-nghiep/hoi-dap/:id" element={<HanoiBusinessFAQDetailPage />} />
                    <Route path="/ha-noi/hoi-dap" element={<HanoiFAQPage />} />
                    <Route path="/ha-noi/hoi-dap/:id" element={<HanoiFAQDetailPage />} />
                    <Route path="/ha-noi/lien-he" element={<HanoiContactPage />} />
                    <Route path="/ha-noi/hotline" element={<HanoiHotlinePage />} />

                    <Route path="/lao-cai" element={<LaoCaiHomePage />} />
                    <Route path="/lao-cai/gioi-thieu" element={<LaoCaiAboutPage />} />
                    <Route path="/lao-cai/tin-tuc" element={<LaoCaiNewsPage />} />
                    <Route path="/lao-cai/tin-tuc/:categorySlug" element={<LaoCaiNewsCategoryPage />} />
                    <Route path="/lao-cai/van-ban" element={<LaoCaiLegalDocsPage />} />
                    <Route path="/lao-cai/du-thao" element={<LaoCaiDraftDocsPage />} />
                    <Route path="/lao-cai/pho-bien-giao-duc" element={<LaoCaiLawDisseminationPage />} />
                    <Route path="/lao-cai/tro-giup-phap-ly" element={<LaoCaiLegalAidPage />} />
                    <Route path="/lao-cai/ho-tro-phap-ly-doanh-nghiep" element={<LaoCaiBusinessSupportPage />} />
                    <Route path="/lao-cai/ho-tro-phap-ly-doanh-nghiep/hoi-dap/:id" element={<LaoCaiBusinessFAQDetailPage />} />
                    <Route path="/lao-cai/hoi-dap" element={<LaoCaiFAQPage />} />
                    <Route path="/lao-cai/hoi-dap/:id" element={<LaoCaiFAQDetailPage />} />
                    <Route path="/lao-cai/lien-he" element={<LaoCaiContactPage />} />
                    <Route path="/lao-cai/hotline" element={<LaoCaiHotlinePage />} />

                    <Route path="/lao-cai-v2" element={<LaoCaiV2HomePage />} />
                    <Route path="/lao-cai-v2/gioi-thieu" element={<LaoCaiV2AboutPage />} />
                    <Route path="/lao-cai-v2/tin-tuc" element={<LaoCaiV2NewsPage />} />
                    <Route path="/lao-cai-v2/thu-vien-phap-luat" element={<LaoCaiV2LegalLibraryPage />} />
                    <Route path="/lao-cai-v2/multimedia" element={<LaoCaiV2MultimediaPage />} />
                    <Route path="/lao-cai-v2/tin-tuc/:categorySlug" element={<LaoCaiV2NewsCategoryPage />} />
                    <Route path="/lao-cai-v2/van-ban" element={<LaoCaiV2LegalDocsPage />} />
                    <Route path="/lao-cai-v2/du-thao" element={<LaoCaiV2DraftDocsPage />} />
                    {/* 3 chuyên trang của Cổng Lào Cai mới: clone nguyên thiết kế 3 chuyên trang Cổng Pháp luật quốc gia */}
                    <Route element={<LaoCaiV2SpecializedLayout />}>
                        <Route path="/lao-cai-v2/pho-bien-giao-duc" element={<LaoCaiV2PhoBienGiaoDucPage />} />
                        <Route path="/lao-cai-v2/pho-bien-giao-duc/tin-tuc/:id" element={<LaoCaiV2PBGDPLNewsDetailPage />} />
                        <Route path="/lao-cai-v2/ho-tro-phap-ly-doanh-nghiep/*" element={<LaoCaiV2HoTroPhapLyDoanhNghiepPage />} />
                        <Route path="/lao-cai-v2/tro-giup-phap-ly" element={<Navigate to="/lao-cai-v2/tro-giup-phap-ly/chuc-nang-nhiem-vu" replace />} />
                        <Route path="/lao-cai-v2/tro-giup-phap-ly/lich-su-phat-trien" element={<LaoCaiV2_LichSuPhatTrienTGPLPage />} />
                        <Route path="/lao-cai-v2/tro-giup-phap-ly/chuc-nang-nhiem-vu" element={<LaoCaiV2_ChucNangNhiemVuTGPLPage />} />
                        <Route path="/lao-cai-v2/tro-giup-phap-ly/co-cau-to-chuc" element={<LaoCaiV2_CoCauToChucTGPLPage />} />
                        <Route path="/lao-cai-v2/tro-giup-phap-ly/co-cau-to-chuc/:id" element={<LaoCaiV2_CoCauToChucTGPLDetailPage />} />
                        <Route path="/lao-cai-v2/tro-giup-phap-ly/danh-ba" element={<LaoCaiV2_DanhBaDienTuTGPLPage />} />
                        <Route path="/lao-cai-v2/tro-giup-phap-ly/video" element={<LaoCaiV2_VideoPhongSuTGPLPage />} />
                        <Route path="/lao-cai-v2/tro-giup-phap-ly/tin-tuc" element={<LaoCaiV2_TinTucHoatDongTGPLPage />} />
                        <Route path="/lao-cai-v2/tro-giup-phap-ly/an-pham" element={<LaoCaiV2_AnPhamTGPLPage />} />
                        <Route path="/lao-cai-v2/tro-giup-phap-ly/chi-dao-dieu-hanh" element={<LaoCaiV2_ThongTinDieuHanhTGPLPage />} />
                        <Route path="/lao-cai-v2/tro-giup-phap-ly/huong-dan-nghiep-vu" element={<LaoCaiV2_HuongDanNghiepVuTGPLPage />} />
                        <Route path="/lao-cai-v2/tro-giup-phap-ly/nghien-cuu-trao-doi" element={<LaoCaiV2_NghienCuuTraoDoiTGPLPage />} />
                        <Route path="/lao-cai-v2/tro-giup-phap-ly/to-chuc" element={<LaoCaiV2_DanhSachToChucTGPLPage />} />
                        <Route path="/lao-cai-v2/tro-giup-phap-ly/to-chuc/:id" element={<LaoCaiV2_ToChucTGPLDetailPage />} />
                        <Route path="/lao-cai-v2/tro-giup-phap-ly/nguoi-thuc-hien" element={<LaoCaiV2_DanhSachNguoiThucHienTGPLPage />} />
                        <Route path="/lao-cai-v2/tro-giup-phap-ly/nguoi-thuc-hien/:id" element={<LaoCaiV2_NguoiThucHienTGPLDetailPage />} />
                        <Route path="/lao-cai-v2/tro-giup-phap-ly/bao-cao-cong-tac" element={<LaoCaiV2_BaoCaoCongTacTGPLPage />} />
                        <Route path="/lao-cai-v2/tro-giup-phap-ly/ban-va-tgpl" element={<LaoCaiV2_BanVaTGPLPage />} />
                        <Route path="/lao-cai-v2/tro-giup-phap-ly/hop-tac-quoc-te" element={<LaoCaiV2_HopTacQuocTeTGPLPage />} />
                        <Route path="/lao-cai-v2/tro-giup-phap-ly/kinh-nghiem-quoc-te" element={<LaoCaiV2_KinhNghiemQuocTeTGPLPage />} />
                        <Route path="/lao-cai-v2/tro-giup-phap-ly/album-anh" element={<LaoCaiV2_AlbumAnhTGPLPage />} />
                        <Route path="/lao-cai-v2/tro-giup-phap-ly/album-anh/:id" element={<LaoCaiV2_AlbumAnhTGPLDetailPage />} />
                        <Route path="/lao-cai-v2/tro-giup-phap-ly/video" element={<LaoCaiV2_VideoTGPLPage />} />
                        <Route path="/lao-cai-v2/tro-giup-phap-ly/video/:id" element={<LaoCaiV2_VideoTGPLDetailPage />} />
                        <Route path="/lao-cai-v2/tro-giup-phap-ly/vu-viec-dien-hinh" element={<LaoCaiV2_VuViecDienHinhTGPLPage />} />
                        <Route path="/lao-cai-v2/tro-giup-phap-ly/vu-viec-dien-hinh/:id" element={<LaoCaiV2_VuViecDienHinhDetailPage />} />
                    </Route>
                    <Route path="/lao-cai-v2/hoi-dap" element={<LaoCaiV2FAQPage />} />
                    <Route path="/lao-cai-v2/hoi-dap/:id" element={<LaoCaiV2FAQDetailPage />} />
                    <Route path="/lao-cai-v2/lien-he" element={<LaoCaiV2ContactPage />} />
                    <Route path="/lao-cai-v2/hotline" element={<LaoCaiV2HotlinePage />} />
                    <Route path="/trang-chu-v2" element={<HomePageV2 />} />
                    <Route path="/trang-chu-v3" element={<HomePageV3 />} />
                    <Route path="/ho-tro-phap-ly-doanh-nghiep/*" element={<HoTroPhapLyDoanhNghiepPage />} />
                    <Route path="/pho-bien-giao-duc" element={<PhoBienGiaoDucPhapLuatPage />} />
                    <Route path="/pho-bien-giao-duc-backup" element={<PhoBienGiaoDucPhapLuatPageBackup />} />
                    <Route path="/tin-tuc/:id" element={<PBGDPLNewsDetailPage />} />
                    <Route path="/news/:id" element={<NewsDetailPage />} />
                    <Route path="/gioi-thieu" element={<AboutPage />} />
                    <Route path="/gioi-thieu/chuc-nang-nhiem-vu" element={<ChucNangNhiemVuPage />} />
                    <Route path="/tam-nhin" element={<VisionPage />} />
                    <Route path="/gioi-thieu/thu-ngo" element={<ThuNgoPage />} />
                    <Route path="/nghi-quyet-66" element={<NghiQuyet66Page />} />
                    <Route path="/huong-dan-su-dung" element={<UserManualDocListPage />} />
                    <Route path="/huong-dan-su-dung/bai-viet/:id" element={<UserManualArticlePage />} />
                    <Route path="/tin-tuc/noi-bat" element={<NewsHighlightsPage />} />
                    <Route path="/tin-tuc/van-hoa-thuong-ton-phap-luat" element={<VanHoaThuongTonPhapLuatPage />} />
                    <Route path="/tin-tuc/van-hoa-thuong-ton-phap-luat/:categorySlug" element={<VanHoaSubCategoryPage />} />
                    <Route path="/tin-tuc/xay-dung-van-hoa-thuong-ton-phap-luat" element={<VanHoaThuongTonPhapLuatPage />} />
                    <Route path="/tin-tuc/xay-dung-van-hoa-thuong-ton-phap-luat/:categorySlug" element={<VanHoaSubCategoryPage />} />
                    <Route path="/tin-tuc/nghien-cuu-trao-doi" element={<NghienCuuTraoDoiPage />} />
                    <Route path="/tin-tuc/nghien-cuu-trao-doi/:id" element={<NghienCuuTraoDoiDetailPage />} />
                    <Route path="/tin-tuc/toa-dam-su-kien" element={<ToaDamSuKienPage />} />
                    <Route path="/tin-tuc/toa-dam-su-kien/:id" element={<ToaDamSuKienDetailPage />} />
                    <Route path="/lien-he" element={<ContactUsPage />} />
                    <Route path="/chu-de-khao-sat" element={<SurveyTopicsPage />} />
                    <Route path="/chu-de-khao-sat/:id" element={<SurveyTopicDetailPage />} />
                    <Route path="/ban-tin/dang-ky" element={<NewsletterRegistrationPage />} />
                    <Route path="/ban-tin/huy-dang-ky" element={<UnsubscribeNewsletterPage />} />
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
                    <Route path="/radio" element={<LegalRadio />} />
                    <Route path="/van-ban/hieu-luc" element={<VanBanHieuLucPage />} />
                    <Route path="/van-ban/het-hieu-luc" element={<VanBanHetHieuLucPage />} />
                    <Route path="/van-ban/moi-ban-hanh" element={<VanBanMoiPage />} />
                    <Route path="/van-ban/chu-y" element={<VanBanChuYPage />} />
                    <Route path="/van-ban/tim-kiem" element={<VanBanQPPLPage />} />
                    <Route path="/van-ban" element={<VanBanHomePage />} />
                    <Route path="/van-ban/:id" element={<VanBanDetailPage />} />
                    <Route path="/thanh-vien/:id" element={<PublicUserProfilePage />} />
                    <Route path="/du-thao" element={<DuThaoPage />} />
                    <Route path="/hien-ke" element={<HienKePage />} />
                    <Route path="/hien-ke/doi-song" element={<HienKeDoiSongPage />} />
                    <Route path="/hien-ke/noi-bat" element={<HienKeNoiBatPage />} />
                    <Route path="/hien-ke/noi-bat-v2" element={<HienKeNoiBatV2Page />} />
                    <Route path="/hien-ke/linh-vuc" element={<HienKeLinhVucPage />} />
                    <Route path="/hien-ke/linh-vuc/danh-sach" element={<HienKeLinhVucDanhSachPage />} />
                    <Route path="/hien-ke/lien-he" element={<HienKeFeedbackPage />} />
                    <Route path="/hien-ke/quy-trinh" element={<HienKeQuyTrinhPage />} />
                    <Route path="/hien-ke/:id" element={<HienKeDetailPage />} />
                    <Route path="/hien-ke/gop-y/:id" element={<ConsultFeedbackPage />} />
                    <Route path="/hien-ke/gop-y-nhanh" element={<SimpleFeedbackPage />} />
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
                    <Route path="/tong-ra-soat/ai/:id" element={<TongRaSoatAIDetailPage />} />

                    {/* Legal Aid Routes */}
                    <Route path="/tro-giup-phap-ly" element={<GioiThieuTGPLPage />} />
                    <Route path="/tro-giup-phap-ly/lich-su-phat-trien" element={<LichSuPhatTrienTGPLPage />} />
                    <Route path="/tro-giup-phap-ly/chuc-nang-nhiem-vu" element={<ChucNangNhiemVuTGPLPage />} />
                    <Route path="/tro-giup-phap-ly/co-cau-to-chuc" element={<CoCauToChucTGPLPage />} />
                    <Route path="/tro-giup-phap-ly/co-cau-to-chuc/:id" element={<CoCauToChucTGPLDetailPage />} />
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
                    <Route path="/tro-giup-phap-ly/ban-va-tgpl" element={<BanVaTGPLPage />} />
                    <Route path="/tro-giup-phap-ly/hop-tac-quoc-te" element={<HopTacQuocTeTGPLPage />} />
                    <Route path="/tro-giup-phap-ly/kinh-nghiem-quoc-te" element={<KinhNghiemQuocTeTGPLPage />} />
                    <Route path="/tro-giup-phap-ly/album-anh" element={<AlbumAnhTGPLPage />} />
                    <Route path="/tro-giup-phap-ly/album-anh/:id" element={<AlbumAnhTGPLDetailPage />} />
                    <Route path="/tro-giup-phap-ly/video" element={<VideoTGPLPage />} />
                    <Route path="/tro-giup-phap-ly/video/:id" element={<VideoTGPLDetailPage />} />
                    <Route path="/tro-giup-phap-ly/vu-viec-dien-hinh" element={<VuViecDienHinhTGPLPage />} />
                    <Route path="/tro-giup-phap-ly/vu-viec-dien-hinh/:id" element={<VuViecDienHinhDetailPage />} />

                    {/* Forum Routes */}
                    <Route path="/dien-dan" element={<ForumListPage />} />
                    <Route path="/dien-dan/thong-ke" element={<ForumDashboardPage />} />
                    <Route path="/dien-dan/chu-de/:id" element={<ForumTopicListPage />} />
                    <Route path="/dien-dan/chu-de/:id/tao-gop-y" element={<CreateContributionPage />} />
                    <Route path="/dien-dan/bai-viet/:id" element={<TopicDetailPage />} />
                    <Route path="/dien-dan/gop-y/:id" element={<ContributionDetailPage />} />
                    <Route path="/dien-dan/tao-moi" element={<CreateTopicPage />} />
                    <Route path="/dien-dan/cap-nhat/:id" element={<UpdateTopicPage />} />
                    <Route path="/dien-dan/su-kien" element={<LivestreamListPage />} />
                    <Route path="/dien-dan/su-kien/:slug" element={<LivestreamEventPage />} />

                    {/* Legal Questions Routes */}
                    <Route path="/cau-hoi-phap-luat" element={<DanhSachCauHoiPage />} />
                    <Route path="/cau-hoi-phap-luat/chu-de" element={<ChuDeHoiDapPage />} />
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
                        <Route path="hien-ke" element={<UserHienKePage />} />
                        <Route path="phan-anh-kien-nghi" element={<UserPetitionsPage />} />
                    </Route>

                    {/* Officer Portal Routes */}
                    <Route path="/can-bo" element={<OfficerDashboardLayout />}>
                        <Route path="trang-chu" element={<OfficerHomePage />} />
                        <Route path="ho-so" element={<OfficerProfilePage />} />
                        <Route path="cai-dat" element={<OfficerSettingsPage />} />
                        <Route path="phan-hoi-hien-ke" element={<OfficerHienKePage />} />
                        <Route path="phan-hoi-hien-ke/:id" element={<OfficerHienKeDetailPage />} />
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

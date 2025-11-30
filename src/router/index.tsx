// src/router/index.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

// USER LAYOUT
import { Layout } from "../components/Layout/Layout";

// USER PAGES
import { Home } from "../pages/Home/Home";
import { MovieDetail } from "../pages/MovieDetail/MovieDetail";
import { MovieBookingTicket } from "../pages/Booking/MovieBookingTicket";
import { FavoritesPage } from "../pages/Favorites/FavoritesPage";
import { TrendingPage } from "../pages/Trending/TrendingPage";
import { WatchedPage } from "../pages/Watched/WatchedPage";
import { CommunityPage } from "../pages/Community/CommunityPage";
import { SettingsPage } from "../pages/Settings/SettingsPage";
import { ShowtimesPage } from "../pages/Showtimes/ShowtimesPage";
import { CinemaDetailPage } from "../pages/CinemaDetail/CinemaDetailPage";
import { CinemaListPage } from "../pages/CinemaDetail/CinemaListPage";
import { PhimChieuPage } from "../pages/PhimChieu/PhimChieuPage";
import { ReviewPage} from "../pages/Review/ReviewPage";
import { ReviewDetailPage} from "../pages/Review/ReviewDetailPage";
// AUTH PAGES
import { Login } from "../pages/Auth/Login";
import { Register } from "../pages/Auth/Register";
import { ForgotPassword } from "../pages/Auth/ForgotPassword";
import { ResetPassword } from "../pages/Auth/ResetPassword";

// AUTH GUARDS
import { ProtectedRoute } from "./ProtectedRoute";
import { AdminRoute } from "./AdminRoute";

// ADMIN LAYOUT
import { AdminLayout } from "../components/Admin/AdminLayout";

// ADMIN PAGES
import { AdminDashboard } from "../pages/Admin/AdminDashBoard";
import { CinemasList } from "../pages/Admin/Cinemas/CinemasList";
import { CinemaDetail } from "../pages/Admin/Cinemas/CinemaDetail";
import { CinemaAuditoriums } from "../pages/Admin/Cinemas/CinemaAuditoriums";
import { CinemaShowtimes } from "../pages/Admin/Cinemas/CinemaShowtimes";
import { TicketsManagement } from "../pages/Admin/Tickets/TicketsManagement";
import { UsersManagement } from "../pages/Admin/Users/UsersManagement";
import { PromotionsAdmin } from "../pages/Admin/Promotions/PromotionsAdmin";
import { AdminSettings } from "../pages/Admin/Settings/AdminSettings";
import { AuditoriumList } from "../pages/Admin/Auditoriums/AuditoriumList";
import { AuditoriumDetail } from "../pages/Admin/Auditoriums/AuditoriumDetail";

const NotFound = () => (
  <div style={{ color: "white", padding: 40, fontSize: 24 }}>
    404 — Trang không tồn tại
  </div>
);

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* USER */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        {/* ⭐ TRANG Trending */}
        <Route path="trending" element={<TrendingPage />} />
          {/* ⭐ TRANG REVIEW PHIM */}
        <Route path="review-phim" element={<ReviewPage />} />
          {/* Trang chi tiết review */}
        <Route path="review/:id" element={<ReviewDetailPage />} />

          {/* ⭐ TRANG PHIM CHIẾU */}
        <Route path="phim-chieu" element={<PhimChieuPage />} />
          {/* ⭐ TRANG RẠP CHIẾU */}
        <Route path="cinemas" element={<CinemaListPage />} />
         {/* ⭐ TRANG YÊU THÍCH */}
          <Route path="favorites" element={<FavoritesPage />} />
          {/* MovieDetail không cần login */}
          <Route path="movie/:id" element={<MovieDetail />} />
          {/* Phim đã xem */}
          <Route path="watched" element={<WatchedPage />} />
          {/* Chi tiết rạp */}
          <Route path="cinema/:cinemaId" element={<CinemaDetailPage />} />

          {/* Cộng đồng */}
          <Route path="community" element={<CommunityPage />} />
          
          {/* Cài đặt */}
          <Route path="settings" element={<SettingsPage />} />
          {/* ⭐ TRANG LỊCH CHIẾU */}
          <Route path="showtimes" element={<ShowtimesPage />} />
          {/* Booking bắt buộc login */}
          <Route
            path="booking/:showtimeId"
            element={
              <ProtectedRoute>
                <MovieBookingTicket />
              </ProtectedRoute>
            }
            
          />
        </Route>

        {/* ADMIN */}

        <Route
          path="/admin"
          element={
            
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<AdminDashboard />} />

          {/* Cinemas */}
          <Route path="cinemas" element={<CinemasList />} />
          <Route path="cinemas/:id" element={<CinemaDetail />} />
          <Route path="cinemas/:id/auditoriums" element={<CinemaAuditoriums />} />
          <Route path="cinemas/:id/showtimes" element={<CinemaShowtimes />} />

          {/* Others */}
          <Route path="tickets" element={<TicketsManagement />} />
          <Route path="users" element={<UsersManagement />} />
          <Route path="promotions" element={<PromotionsAdmin />} />
          <Route path="settings" element={<AdminSettings />} />

          <Route path="auditoriums" element={<AuditoriumList />} />
          <Route path="auditoriums/:id" element={<AuditoriumDetail />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

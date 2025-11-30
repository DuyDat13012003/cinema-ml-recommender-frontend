// ==================== PhimChieuPage.tsx ====================
import { useState } from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Grid,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

import { useMovies } from "../../hooks/useMovies";
import { MovieCard } from "../../components/Common/MovieCard";


export const PhimChieuPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // ⭐ Nhận tab từ Home (View All)
  const initialTab = location.state?.tab ?? "now-showing";
  const [tab, setTab] = useState(initialTab);

  // ⭐ Load ALL movies
  const { data: movies = [] } = useMovies("all");

  // ========================= FILTER LOGIC =========================
  const filterMovies = () => {
    switch (tab) {
      case "now-showing":
        return movies.slice(0, 4); // hoặc lọc theo ngày phát hành
      case "coming-soon":
        return movies.slice(4, 6);
      case "hot":
        return movies.sort((a, b) => b.rating - a.rating).slice(0, 4);
      case "recommended":
        return movies.slice(1, 5);
      case "promotions":
        return movies.slice(2, 6);
      default:
        return movies;
    }
  };

  const list = filterMovies();

  // ========================= UI =========================
  return (
    <Box sx={{ p: 4, color: "white" }}>
      <Typography variant="h4" fontWeight={800} sx={{ mb: 3 }}>
        🎬 Phim Chiếu
      </Typography>

      {/* ====================== TABS ====================== */}
      <Tabs
        value={tab}
        onChange={(e, val) => setTab(val)}
        sx={{
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          mb: 3,
          "& .MuiTab-root": {
            color: "#aaa",
            textTransform: "none",
            fontSize: "16px",
            mr: 2,
          },
          "& .Mui-selected": {
            color: "#3b82f6 !important",
            fontWeight: 700,
          },
          "& .MuiTabs-indicator": {
            backgroundColor: "#3b82f6",
            height: "3px",
          },
        }}
      >
        <Tab label="Đang chiếu" value="now-showing" />
        <Tab label="Sắp chiếu" value="coming-soon" />
        <Tab label="Đang hot" value="hot" />
        <Tab label="Gợi ý cho bạn" value="recommended" />
        <Tab label="Khuyến mãi" value="promotions" />
        <Tab label="Tất cả" value="all" />
      </Tabs>

      {/* ====================== MOVIE GRID ====================== */}
      <Grid container spacing={3}>
        {list.map((movie) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
            <MovieCard
                id={movie.id}
                title={movie.title}
                posterUrl={movie.posterUrl}
                rating={movie.rating}
                releaseDate={movie.releaseDate}
                genres={movie.genres}
                ageRating={movie.ageRating}

                // 2 cái này KHÔNG cần truyền vì MovieCard tự navigate
                // onClick={() => navigate(`/movie/${movie.id}`)}
                // onBook={() => navigate(`/booking/${movie.id}`)}

                showBookingButton={true}   // hoặc false nếu bạn muốn ẩn nút
            />
            </Grid>
        ))}
      </Grid>

      {/* Nếu rỗng */}
      {list.length === 0 && (
        <Typography sx={{ mt: 4, opacity: 0.6 }}>
          Không có phim nào trong mục này.
        </Typography>
      )}
    </Box>
  );
};

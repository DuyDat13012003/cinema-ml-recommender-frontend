// ======================= TrendingPage.tsx =======================
import { useState, useMemo } from "react";
import {
  Box,
  Typography,
  Grid,
  CircularProgress,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

import { useMovies } from "../../hooks/useMovies";
import { MovieCard } from "../../components/Common/MovieCard";

export const TrendingPage = () => {
  // ===== LOAD DATA =====
  const { data: movies = [], isLoading } = useMovies("trending");

  // ===== STATE =====
  const [genreFilter, setGenreFilter] = useState("All");
  const [ageFilter, setAgeFilter] = useState("All");
  const [sortBy, setSortBy] = useState("rating-desc");

  const genres = [
    "All",
    "Action",
    "Drama",
    "Sci-Fi",
    "Adventure",
    "Animation",
    "Fantasy",
  ];

  const ageRatings = ["All", "6+", "13+", "16+", "18+"];

  // ===== FILTER + SORT LOGIC =====
  const filteredMovies = useMemo(() => {
    return movies
      .filter(
        (m) => genreFilter === "All" || m.genres.includes(genreFilter)
      )
      .filter(
        (m) => ageFilter === "All" || m.ageRating === ageFilter
      )
      .sort((a, b) => {
        if (sortBy === "rating-desc") return b.rating - a.rating;
        if (sortBy === "rating-asc") return a.rating - b.rating;
        if (sortBy === "title-asc") return a.title.localeCompare(b.title);
        if (sortBy === "title-desc") return b.title.localeCompare(a.title);
        return 0;
      });
  }, [movies, genreFilter, ageFilter, sortBy]);

  return (
    <Box sx={{ p: 4, color: "#fff" }}>
      {/* ================= BANNER ================= */}
      <Box
        sx={{
          width: "100%",
          height: 260,
          backgroundImage:
            "url(https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&w=1400)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: 3,
          mb: 5,
          display: "flex",
          alignItems: "flex-end",
          p: 3,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            color: "#fff",
            textShadow: "0 4px 20px rgba(0,0,0,0.8)",
          }}
        >
          🔥 Phim thịnh hành
        </Typography>
      </Box>

      {/* ================= FILTER BAR ================= */}
      <Box
        sx={{
          display: "flex",
          gap: 3,
          mb: 4,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        {/* GENRE */}
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          {genres.map((g) => (
            <Chip
              key={g}
              label={g}
              clickable
              onClick={() => setGenreFilter(g)}
              sx={{
                backgroundColor: genreFilter === g ? "#4299e1" : "#1a1a2e",
                color: genreFilter === g ? "#fff" : "#ccc",
                fontWeight: 600,
                px: 2,
              }}
            />
          ))}
        </Box>

        {/* AGE FILTER */}
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel sx={{ color: "#ccc" }}>Độ tuổi</InputLabel>
          <Select
            value={ageFilter}
            label="Độ tuổi"
            onChange={(e) => setAgeFilter(e.target.value)}
            sx={{ color: "#fff" }}
          >
            {ageRatings.map((age) => (
              <MenuItem key={age} value={age}>
                {age}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* SORT */}
        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel sx={{ color: "#ccc" }}>Sắp xếp</InputLabel>
          <Select
            value={sortBy}
            label="Sắp xếp"
            onChange={(e) => setSortBy(e.target.value)}
            sx={{ color: "#fff" }}
          >
            <MenuItem value="rating-desc">Rating cao → thấp</MenuItem>
            <MenuItem value="rating-asc">Rating thấp → cao</MenuItem>
            <MenuItem value="title-asc">A → Z</MenuItem>
            <MenuItem value="title-desc">Z → A</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* ================= LOADING ================= */}
      {isLoading && (
        <Box sx={{ textAlign: "center", mt: 6 }}>
          <CircularProgress sx={{ color: "#4299e1" }} />
        </Box>
      )}

      {/* ================= MOVIE GRID (GRID V2) ================= */}
      {!isLoading && (
        <Grid container spacing={3}>
          {filteredMovies.map((movie) => (
            <Grid
              key={movie.id}
              size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
            >
              <MovieCard
                id={movie.id}
                title={movie.title}
                posterUrl={movie.posterUrl}
                rating={movie.rating}
                releaseDate={movie.releaseDate}
                genres={movie.genres}
                ageRating={movie.ageRating}
                showBookingButton
              />
            </Grid>
          ))}
        </Grid>
      )}

      {/* ================= EMPTY STATE ================= */}
      {!isLoading && filteredMovies.length === 0 && (
        <Typography sx={{ mt: 4, opacity: 0.6 }}>
          Không có phim nào phù hợp bộ lọc.
        </Typography>
      )}
    </Box>
  );
};

// ======================= TrendingPage.tsx =======================
import {
  Box,
  Typography,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
} from "@mui/material";
import { useMovies } from "../../hooks/useMovies";
import { MovieCarousel } from "../../components/Common/MovieCarousel";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const TrendingPage = () => {
  const navigate = useNavigate();
  const { data: movies, isLoading } = useMovies("trending");

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

  const filteredMovies = movies
    ?.filter(
      (m) => genreFilter === "All" || m.genres.includes(genreFilter)
    )
    ?.filter((m) => ageFilter === "All" || m.ageRating === ageFilter)
    ?.sort((a, b) => {
      if (sortBy === "rating-desc") return b.rating - a.rating;
      if (sortBy === "rating-asc") return a.rating - b.rating;
      if (sortBy === "title-asc") return a.title.localeCompare(b.title);
      if (sortBy === "title-desc") return b.title.localeCompare(a.title);
      return 0;
    });

  return (
    <Box sx={{ p: 4 }}>
      {/* ================= BANNER ================= */}
      <Box
        sx={{
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
          🔥 Thịnh hành
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
        {/* Genre chips */}
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
              }}
            />
          ))}
        </Box>

        {/* Age */}
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel sx={{ color: "#ccc" }}>Độ tuổi</InputLabel>
          <Select
            value={ageFilter}
            label="Độ tuổi"
            onChange={(e) => setAgeFilter(e.target.value)}
            sx={{ color: "#fff" }}
          >
            {ageRatings.map((a) => (
              <MenuItem key={a} value={a}>
                {a}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Sort */}
        <FormControl size="small" sx={{ minWidth: 150 }}>
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

      {/* ================= CONTENT ================= */}
      {isLoading && (
        <Box sx={{ textAlign: "center", mt: 6 }}>
          <CircularProgress sx={{ color: "#4299e1" }} />
        </Box>
      )}

      {!isLoading && filteredMovies && (
        <MovieCarousel
          title=""                 // ❗ không cần title vì đã có banner
          movies={filteredMovies}  // ⭐ dùng MovieCard giống Home
          onViewAll={() => navigate("/thinh-hanh")}
        />
      )}
    </Box>
  );
};

// ======================= TrendingPage.tsx =======================
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
import { useState } from "react";

export const TrendingPage = () => {
  const { data: trendingMovies, isLoading } = useMovies("trending");

  const [genreFilter, setGenreFilter] = useState("All");
  const [ageFilter, setAgeFilter] = useState("All");
  const [sortBy, setSortBy] = useState("rating-desc");

  const genres = ["All", "Action", "Drama", "Sci-Fi", "Adventure", "Animation", "Fantasy"];
  const ageRatings = ["All", "6+", "13+", "16+", "18+"];

  const filteredMovies = trendingMovies
    ?.filter((movie) => genreFilter === "All" || movie.genres.includes(genreFilter))
    ?.filter((movie) => ageFilter === "All" || movie.ageRating === ageFilter)
    ?.sort((a, b) => {
      if (sortBy === "rating-desc") return b.rating - a.rating;
      if (sortBy === "rating-asc") return a.rating - b.rating;
      if (sortBy === "title-asc") return a.title.localeCompare(b.title);
      if (sortBy === "title-desc") return b.title.localeCompare(a.title);
      return 0;
    });

  return (
    <Box sx={{ p: 4 }}>
      {/* BANNER */}
      <Box
        sx={{
          width: "100%",
          height: 260,
          backgroundImage:
            "url(https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&w=1400)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: 3,
          position: "relative",
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
            textShadow: "0px 4px 20px rgba(0,0,0,0.8)",
          }}
        >
          🔥 Thịnh hành
        </Typography>
      </Box>

      {/* FILTER BAR */}
      <Box
        sx={{
          display: "flex",
          gap: 3,
          mb: 4,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        {/* GENRE FILTER */}
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
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
            sx={{ color: "#fff", borderColor: "#fff" }}
          >
            {ageRatings.map((age) => (
              <MenuItem key={age} value={age}>
                {age}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* SORT */}
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

      {/* LOADING */}
      {isLoading && (
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <CircularProgress sx={{ color: "#4299e1" }} />
        </Box>
      )}

      {/* MOVIE GRID */}
      <Grid container spacing={3}>
        {filteredMovies?.map((movie) => (
          <Grid item xs={12} sm={6} md={3} key={movie.id}>
            <Box sx={{ width: "280px", // ⭐ GIỐNG HOME → FIX CARD LỆCH
                maxWidth: "280px", }}>
              <MovieCard {...movie} />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

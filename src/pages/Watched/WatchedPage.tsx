// ======================= WatchedPage.tsx =======================
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import StarIcon from "@mui/icons-material/Star";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useWatched } from "../../context/WatchedContext";
import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";

export const WatchedPage = () => {
  const { watched, removeWatched, clearWatched } = useWatched();
  const navigate = useNavigate();

  const [genreFilter, setGenreFilter] = useState("all");
  const [sortBy, setSortBy] = useState("recent");

  // 📌 LẤY DANH SÁCH GENRES (unique)
  const allGenres = Array.from(
    new Set(watched.flatMap((movie) => movie.genres || []))
  );

  // 📌 FILTER + SORT
  const filteredMovies = useMemo(() => {
    let list = [...watched];

    // FILTER
    if (genreFilter !== "all") {
      list = list.filter((movie) => movie.genres?.includes(genreFilter));
    }

    // SORT
    if (sortBy === "recent") {
      list.sort((a, b) => (b.watchedAt || 0) - (a.watchedAt || 0));
    } else if (sortBy === "rating") {
      list.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "title") {
      list.sort((a, b) => a.title.localeCompare(b.title));
    }

    return list;
  }, [watched, genreFilter, sortBy]);

  const handleClickMovie = (id: string) => {
    navigate(`/movie/${id}`);
  };

  return (
    <Box sx={{ p: 4 }}>
      {/* TITLE */}
      <Typography
        variant="h4"
        sx={{
          color: "#fff",
          fontWeight: 700,
          mb: 4,
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        👁️ Phim đã xem
      </Typography>

      {/* —— FILTER + SORT —— */}
      <Box
        sx={{
          display: "flex",
          gap: 3,
          mb: 4,
          flexWrap: "wrap",
        }}
      >
        {/* Genre Filter */}
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel sx={{ color: "#ccc" }}>Thể loại</InputLabel>
          <Select
            value={genreFilter}
            onChange={(e) => setGenreFilter(e.target.value)}
            sx={{
              color: "#fff",
              backgroundColor: "#1a1a2e",
              "& .MuiSvgIcon-root": { color: "#fff" },
            }}
            label="Thể loại"
          >
            <MenuItem value="all">Tất cả</MenuItem>
            {allGenres.map((g) => (
              <MenuItem key={g} value={g}>
                {g}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Sort */}
        <FormControl sx={{ minWidth: 180 }}>
          <InputLabel sx={{ color: "#ccc" }}>Sắp xếp theo</InputLabel>
          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            sx={{
              color: "#fff",
              backgroundColor: "#1a1a2e",
              "& .MuiSvgIcon-root": { color: "#fff" },
            }}
            label="Sort"
          >
            <MenuItem value="recent">🔄 Mới xem gần đây</MenuItem>
            <MenuItem value="rating">⭐ Rating cao</MenuItem>
            <MenuItem value="title">🔤 A → Z</MenuItem>
          </Select>
        </FormControl>

        {/* Clear All */}
        {watched.length > 0 && (
          <Button
            color="error"
            variant="outlined"
            onClick={clearWatched}
            sx={{ borderColor: "#ff6b6b", color: "#ff6b6b" }}
          >
            Xoá tất cả
          </Button>
        )}
      </Box>

      {/* EMPTY STATE */}
      {watched.length === 0 && (
        <Typography sx={{ color: "#aaa", fontSize: "1.2rem", mt: 4 }}>
          Bạn chưa xem phim nào.
        </Typography>
      )}

      {/* MOVIE GRID */}
      <Grid container spacing={3}>
        {filteredMovies.map((movie) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={movie.id}>
            <Card
              sx={{
                backgroundColor: "#1a1a2e",
                color: "#fff",
                borderRadius: 3,
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
                transition: "transform 0.25s",
                "&:hover": { transform: "scale(1.03)" },
              }}
            >
              {/* Delete button */}
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  removeWatched(movie.id);
                }}
                sx={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  backgroundColor: "rgba(255,0,0,0.2)",
                  "&:hover": { backgroundColor: "rgba(255,0,0,0.4)" },
                }}
              >
                <DeleteIcon sx={{ color: "#ff6b6b" }} />
              </IconButton>

              {/* Watched Icon */}
              <VisibilityIcon
                sx={{
                  position: "absolute",
                  top: 12,
                  left: 12,
                  fontSize: 28,
                  color: "#4299e1",
                }}
              />

              <CardMedia
                component="img"
                image={movie.posterUrl}
                alt={movie.title}
                sx={{ height: 250, objectFit: "cover" }}
                onClick={() => handleClickMovie(movie.id)}
              />

              <CardContent onClick={() => handleClickMovie(movie.id)}>
                <Typography sx={{ fontSize: "1.1rem", fontWeight: 700 }}>
                  {movie.title}
                </Typography>

                {/* Rating */}
                <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                  <StarIcon sx={{ fontSize: 18, color: "#FFD700", mr: 0.5 }} />
                  <Typography>{movie.rating}</Typography>
                </Box>

                {/* Genres */}
                <Box sx={{ display: "flex", gap: 1, mt: 1, flexWrap: "wrap" }}>
                  {movie.genres?.slice(0, 2).map((g) => (
                    <Box
                      key={g}
                      sx={{
                        px: 1,
                        py: 0.3,
                        backgroundColor: "#2d2d44",
                        borderRadius: 1,
                        fontSize: "0.8rem",
                        color: "#ccc",
                      }}
                    >
                      {g}
                    </Box>
                  ))}
                </Box>

                {/* Watched time */}
                <Typography sx={{ mt: 1, color: "#888", fontSize: "0.85rem" }}>
                  ⏱ Xem lúc:{" "}
                  {movie.watchedAt
                    ? new Date(movie.watchedAt).toLocaleString("vi-VN")
                    : "Không rõ"}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

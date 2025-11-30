// ======================= FavoritesPage.tsx (PREMIUM) =======================
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import StarIcon from "@mui/icons-material/Star";

import { useFavorites } from "../../context/FavoriteContext";
import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";

export const FavoritesPage = () => {
  const { favorites, toggleFavorite, clearFavorites, removeFavorite } =
    useFavorites();
  const navigate = useNavigate();

  const [genreFilter, setGenreFilter] = useState("all");
  const [sortBy, setSortBy] = useState("recent");

  // Lấy danh sách thể loại unique
  const allGenres = Array.from(
    new Set(favorites.flatMap((m) => m.genres || []))
  );

  // FILTER + SORT
  const filteredMovies = useMemo(() => {
    let list = [...favorites];

    if (genreFilter !== "all") {
      list = list.filter((m) => m.genres?.includes(genreFilter));
    }

    // Sorting
    if (sortBy === "recent") {
      list.sort((a, b) => (b.addedAt || 0) - (a.addedAt || 0));
    } else if (sortBy === "rating") {
      list.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "title") {
      list.sort((a, b) => a.title.localeCompare(b.title));
    }

    return list;
  }, [favorites, genreFilter, sortBy]);

  return (
    <Box sx={{ p: 4 }}>
      {/* Title */}
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
        ❤️ Danh sách phim yêu thích
      </Typography>

      {/* Filters */}
      <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap", mb: 4 }}>
        {/* Genre Filter */}
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel sx={{ color: "#ccc" }}>Thể loại</InputLabel>
          <Select
            value={genreFilter}
            label="Thể loại"
            onChange={(e) => setGenreFilter(e.target.value)}
            sx={{
              backgroundColor: "#1a1a2e",
              color: "#fff",
              "& .MuiSvgIcon-root": { color: "#fff" },
            }}
          >
            <MenuItem value="all">Tất cả</MenuItem>
            {allGenres.map((g) => (
              <MenuItem value={g} key={g}>
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
            label="Sort"
            onChange={(e) => setSortBy(e.target.value)}
            sx={{
              backgroundColor: "#1a1a2e",
              color: "#fff",
              "& .MuiSvgIcon-root": { color: "#fff" },
            }}
          >
            <MenuItem value="recent">🕒 Mới thêm gần đây</MenuItem>
            <MenuItem value="rating">⭐ Rating cao</MenuItem>
            <MenuItem value="title">🔤 A → Z</MenuItem>
          </Select>
        </FormControl>

        {/* Clear All Button */}
        {favorites.length > 0 && (
          <Button
            color="error"
            variant="outlined"
            sx={{
              borderColor: "#ff6b6b",
              color: "#ff6b6b",
            }}
            onClick={clearFavorites}
          >
            Xoá tất cả
          </Button>
        )}
      </Box>

      {/* Empty State */}
      {favorites.length === 0 && (
        <Typography sx={{ color: "#aaa", mt: 4, fontSize: "1.2rem" }}>
          Bạn chưa thích phim nào. Hãy bấm ❤️ ở trang phim để thêm nhé!
        </Typography>
      )}

      {/* Movie Grid */}
      <Grid container spacing={3}>
        {filteredMovies.map((movie) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={movie.id}>
            <Card
              sx={{
                backgroundColor: "#1a1a2e",
                color: "#fff",
                borderRadius: 3,
                position: "relative",
                cursor: "pointer",
                transition: "0.25s",
                "&:hover": { transform: "scale(1.03)" },
              }}
            >
              {/* Remove */}
              <IconButton
                sx={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  backgroundColor: "rgba(255,255,255,0.1)",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  removeFavorite(movie.id);
                }}
              >
                <DeleteIcon sx={{ color: "#ff6b6b" }} />
              </IconButton>

              {/* Favorite Icon */}
              <FavoriteIcon
                sx={{
                  position: "absolute",
                  top: 10,
                  left: 10,
                  fontSize: 30,
                  color: "#ff6b6b",
                }}
              />

              <CardMedia
                component="img"
                src={movie.posterUrl}
                onClick={() => navigate(`/movie/${movie.id}`)}
                sx={{ height: 250, objectFit: "cover" }}
              />

              <CardContent onClick={() => navigate(`/movie/${movie.id}`)}>
                <Typography sx={{ fontWeight: 700 }}>{movie.title}</Typography>

                <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                  <StarIcon sx={{ color: "#FFD700", fontSize: 18, mr: 0.5 }} />
                  <Typography>{movie.rating}</Typography>
                </Box>

                {/* Genres */}
                <Box sx={{ display: "flex", gap: 1, mt: 1, flexWrap: "wrap" }}>
                  {movie.genres.slice(0, 2).map((g) => (
                    <Box
                      key={g}
                      sx={{
                        px: 1,
                        py: 0.3,
                        backgroundColor: "#2d2d44",
                        fontSize: "0.8rem",
                        borderRadius: 1,
                        color: "#ccc",
                      }}
                    >
                      {g}
                    </Box>
                  ))}
                </Box>

                {/* Added Time */}
                <Typography sx={{ mt: 1, fontSize: "0.85rem", color: "#888" }}>
                  ❤️ Đã thêm: {new Date(movie.addedAt).toLocaleString("vi-VN")}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

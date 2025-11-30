import {
  Box,
  Typography,
  Chip,
  Divider,
  Grid,
  Stack,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useCinemaDetail } from "../../hooks/useCinemaDetail";
import { useCinemas } from "../../hooks/useCinemas";
import { useShowtimes } from "../../hooks/useShowtimes";
import { useMovies } from "../../hooks/useMovies";
import { useState } from "react";

export const CinemaDetailPage = () => {
  const { cinemaId } = useParams();
  const navigate = useNavigate();

  const { data: cinema } = useCinemaDetail(cinemaId);
  const { data: movies } = useMovies("all");

  // 7 ngày lịch chiếu
  const days = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d.toISOString().split("T")[0];
  });

  const [selectedDate, setSelectedDate] = useState(days[0]);

  const { data: showtimes } = useShowtimes(cinemaId, selectedDate);

  const grouped = Object.values(
    (showtimes ?? []).reduce((acc: any, st) => {
      acc[st.movieId] = acc[st.movieId] || [];
      acc[st.movieId].push(st);
      return acc;
    }, {})
  );

  if (!cinema) return null;

  return (
    <Box sx={{ color: "white", pb: 8 }}>
      {/* Banner */}
      <Box
        sx={{
          height: "45vh",
          backgroundImage: `url(${cinema.banner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          borderRadius: "0 0 20px 20px",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.4), #0a0f1a 90%)",
          }}
        />
      </Box>

      {/* Info */}
      <Box sx={{ p: 3, mt: -12 }}>
        <Typography variant="h4" fontWeight={800}>
          {cinema.name}
        </Typography>

        <Typography sx={{ mt: 1, opacity: 0.8 }}>
          📍 {cinema.address}
        </Typography>

        <Stack direction="row" gap={1} sx={{ mt: 2 }}>
          {cinema.formats.map((f: string) => (
            <Chip
              key={f}
              label={f}
              sx={{
                background: "rgba(59,130,246,0.2)",
                border: "1px solid #3b82f6",
                color: "#3b82f6",
                fontWeight: 600,
              }}
            />
          ))}
        </Stack>

        <Typography sx={{ mt: 2, lineHeight: 1.6 }}>
          {cinema.description}
        </Typography>

        {/* Services */}
        <Typography sx={{ mt: 3 }} variant="h6" fontWeight={700}>
          Tiện ích & Dịch vụ
        </Typography>

        <Stack direction="row" gap={2} flexWrap="wrap" sx={{ mt: 1 }}>
          {cinema.services.map((s: string) => (
            <Chip
              key={s}
              label={s}
              sx={{
                background: "rgba(255,255,255,0.08)",
                color: "white",
                borderRadius: "8px",
              }}
            />
          ))}
        </Stack>

        {/* Gallery */}
        <Typography sx={{ mt: 4 }} variant="h6" fontWeight={700}>
          Hình ảnh rạp
        </Typography>

        <Box
          sx={{
            display: "flex",
            overflowX: "auto",
            gap: 2,
            mt: 2,
            pb: 1,
          }}
        >
          {cinema.gallery.map((img: string) => (
            <Box
              key={img}
              sx={{
                width: "250px",
                height: "160px",
                borderRadius: "12px",
                overflow: "hidden",
                flexShrink: 0,
                backgroundImage: `url(${img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          ))}
        </Box>

        {/* Lịch chiếu */}
        <Typography sx={{ mt: 4 }} variant="h6" fontWeight={700}>
          Lịch chiếu
        </Typography>

        {/* Days */}
        <Box sx={{ display: "flex", mt: 2, gap: 2 }}>
          {days.map((d) => (
            <Chip
              key={d}
              label={d}
              onClick={() => setSelectedDate(d)}
              sx={{
                cursor: "pointer",
                background:
                  selectedDate === d
                    ? "#3b82f6"
                    : "rgba(255,255,255,0.08)",
                color: "white",
              }}
            />
          ))}
        </Box>

        {/* Movies */}
        <Box sx={{ mt: 4 }}>
          {grouped.map((group: any) => {
            const movieId = group[0].movieId.replace("m", "");
            const movie = movies?.find((m) => m.id === movieId);
            if (!movie) return null;

            return (
              <Box
                key={movie.id}
                sx={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "16px",
                  p: 3,
                  mb: 3,
                }}
              >
                <Stack direction="row" gap={2}>
                  <Box
                    onClick={() => navigate(`/movie/${movie.id}`)}
                    sx={{
                      width: "120px",
                      height: "170px",
                      backgroundImage: `url(${movie.posterUrl})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      borderRadius: "10px",
                      cursor: "pointer",
                    }}
                  />
                  <Box>
                    <Typography variant="h5" fontWeight={700}>
                      {movie.title}
                    </Typography>
                    <Typography sx={{ opacity: 0.7 }}>
                      {movie.genres.join(" / ")}
                    </Typography>
                  </Box>
                </Stack>

                {/* Showtimes */}
                <Stack direction="row" gap={2} flexWrap="wrap" sx={{ mt: 3 }}>
                  {group.map((st: any) => (
                    <Box
                      key={st.id}
                      onClick={() => navigate(`/booking/${st.id}`)}
                      sx={{
                        px: 2,
                        py: 1,
                        borderRadius: "10px",
                        background: "rgba(255,255,255,0.08)",
                        border: "1px solid rgba(255,255,255,0.15)",
                        cursor: "pointer",
                        "&:hover": {
                          borderColor: "#3b82f6",
                          boxShadow: "0 0 12px rgba(59,130,246,0.4)",
                        },
                      }}
                    >
                      <Typography fontWeight={700}>{st.time}</Typography>
                    </Box>
                  ))}
                </Stack>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

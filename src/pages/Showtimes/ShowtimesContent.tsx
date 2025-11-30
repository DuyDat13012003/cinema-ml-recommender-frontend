import { Box, Typography, Button } from "@mui/material";
import { useState } from "react";
import { useCinemas } from "../../hooks/useCinemas";
import { useShowtimes } from "../../hooks/useShowtimes";
import { useMovies } from "../../hooks/useMovies";
import { MovieShowtimesPremium } from "../../components/Common/Showtimes/MovieShowtimesPremium.tsx";

export const ShowtimesContent = () => {
  const { data: cinemas } = useCinemas();
  const { data: movies } = useMovies("all");

  // Map m1 → 1
  const convertMovieId = (id: string) => id.replace("m", "");

  const days = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d.toISOString().split("T")[0];
  });

  const [cinemaId, setCinemaId] = useState<string>();
  const [date, setDate] = useState(days[0]);

  const { data: showtimes } = useShowtimes(cinemaId, date);

  const grouped = Object.values(
    showtimes.reduce((acc: any, st) => {
      acc[st.movieId] = acc[st.movieId] || [];
      acc[st.movieId].push(st);
      return acc;
    }, {})
  );

  return (
    <Box sx={{ color: "white" }}>
      <Typography variant="h4" fontWeight={800} sx={{ mb: 4 }}>
        📅 Lịch Chiếu
      </Typography>

      {/* Chọn Rạp */}
      <Typography variant="h6" sx={{ mb: 1 }}>
        Chọn Rạp
      </Typography>

      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 4 }}>
        {cinemas?.map((c) => (
          <Button
            key={c.id}
            variant={cinemaId === c.id ? "contained" : "outlined"}
            onClick={() => setCinemaId(c.id)}
            sx={{ borderRadius: "10px" }}
          >
            {c.name}
          </Button>
        ))}
      </Box>

      {/* Chọn Ngày */}
      <Typography variant="h6" sx={{ mb: 1 }}>
        Chọn Ngày
      </Typography>

      <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap", mb: 4 }}>
        {days.map((d) => (
          <Button
            key={d}
            variant={date === d ? "contained" : "outlined"}
            onClick={() => setDate(d)}
            sx={{ borderRadius: "10px" }}
          >
            {d}
          </Button>
        ))}
      </Box>

      {/* Movie + Suất chiếu */}
      {grouped.length === 0 ? (
        <Typography color="error">❌ Không có suất chiếu.</Typography>
      ) : (
        grouped.map((group: any) => {
          const movieIdConverted = convertMovieId(group[0].movieId);
          const movie = movies?.find(m => m.id === movieIdConverted);


          if (!movie) return null;

          return (
            <MovieShowtimesPremium
              key={movie.id}
              movie={movie}
              showtimes={group}
            />
          );
        })
      )}
    </Box>
  );
};

// src/pages/Admin/Cinemas/CinemaShowtimes.tsx
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
} from "@mui/material";
import { useParams } from "react-router-dom";

import { useAdminShowtimes } from "../../../hooks/admin/useAdminShowtimes";
import { useMovies } from "../../../hooks/useMovies";
import { useAuditoriumManager } from "../../../hooks/admin/useAuditoriumManager";

export const CinemaShowtimes = () => {
  const { id } = useParams();

  const { data: showtimes, isLoading } = useAdminShowtimes();
  const { data: movies } = useMovies("all");
  const { auditoriums } = useAuditoriumManager();

  if (isLoading) {
    return (
      <Typography sx={{ color: "white" }}>
        Đang tải danh sách suất chiếu...
      </Typography>
    );
  }

  // Hàm map: Showtime → { movieName, roomName, ... }
  const mapShowtime = (s: any) => {
    const movieName =
      movies?.find((m) => m.id === s.movieId)?.title || "Không rõ phim";

    const roomName =
      auditoriums.find((r) => r.id === s.auditoriumId)?.name || "Không rõ phòng";

    return {
      ...s,
      movieName,
      roomName,
    };
  };

  const mapped = showtimes.map(mapShowtime);

  return (
    <Box>
      <Typography variant="h4" sx={{ color: "white", mb: 4, fontWeight: 700 }}>
        Suất chiếu của rạp {id}
      </Typography>

      <Grid container spacing={3}>
        {mapped.map((s) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={s.id}>
            <Card sx={{ background: "#1a1a2e", color: "#fff" }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {s.movieName}
                </Typography>

                <Typography sx={{ mt: 1, color: "#aaa" }}>
                  Phòng: {s.roomName}
                  <br />
                  Giờ chiếu: {s.time}
                </Typography>

                <Button
                  sx={{ mt: 2 }}
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={() => console.log("Xem chi tiết suất chiếu:", s.id)}
                >
                  Xem chi tiết
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Button
        variant="outlined"
        sx={{ mt: 4, color: "white", borderColor: "white" }}
        onClick={() => console.log("Thêm suất chiếu mới")}
      >
        + Thêm suất chiếu mới
      </Button>
    </Box>
  );
};

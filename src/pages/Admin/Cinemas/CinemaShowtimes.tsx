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

export const CinemaShowtimes = () => {
  const { id } = useParams();

  // Lấy dữ liệu từ hook (không dùng mock trong page nữa)
  const { data: showtimes, isLoading } = useAdminShowtimes();

  if (isLoading) {
    return (
      <Typography sx={{ color: "white" }}>
        Đang tải danh sách suất chiếu...
      </Typography>
    );
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ color: "white", mb: 4, fontWeight: 700 }}>
        Suất chiếu của rạp {id}
      </Typography>

      <Grid container spacing={3}>
        {showtimes.map((s) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={s.id}>
            <Card sx={{ background: "#1a1a2e", color: "#fff" }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {s.movie}
                </Typography>

                <Typography sx={{ mt: 1, color: "#aaa" }}>
                  Phòng: {s.room}
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

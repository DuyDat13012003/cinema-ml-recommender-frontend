// src/pages/Admin/Cinemas/CinemaAuditoriums.tsx
import { Box, Typography, Card, CardContent, Button, Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import { useAdminAuditoriums } from "../../../hooks/admin/useAdminAuditoriums";

export const CinemaAuditoriums = () => {
  const { id } = useParams();

  // Lấy data từ hook thay vì mock trong file
  const { data: auditoriums, isLoading } = useAdminAuditoriums();

  if (isLoading) {
    return (
      <Typography sx={{ color: "white" }}>
        Đang tải danh sách phòng chiếu...
      </Typography>
    );
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ color: "white", mb: 4, fontWeight: 700 }}>
        Phòng chiếu của rạp {id}
      </Typography>

      <Grid container spacing={3}>
        {auditoriums?.map((a) => (
          <Grid item xs={12} sm={6} md={4} key={a.id}>
            <Card sx={{ background: "#1a1a2e", color: "#fff" }}>
              <CardContent>
                <Typography variant="h6">{a.name}</Typography>

                <Typography sx={{ color: "#aaa", mt: 1 }}>
                  Loại: {a.type}
                  <br />
                  Số ghế: {a.seats}
                </Typography>

                <Button
                  sx={{ mt: 2 }}
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={() => console.log("Xem chi tiết phòng:", a.id)}
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
        onClick={() => console.log("Thêm phòng chiếu mới")}
      >
        + Thêm phòng chiếu mới
      </Button>
    </Box>
  );
};

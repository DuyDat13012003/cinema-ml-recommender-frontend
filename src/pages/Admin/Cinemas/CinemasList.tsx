// src/pages/Admin/Cinemas/CinemasList.tsx
import { Box, Typography, Button, Card, CardContent, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAdminCinemas } from "../../../hooks/admin/useAdminCinemas";

export const CinemasList = () => {
  const navigate = useNavigate();
  const { data: cinemas } = useAdminCinemas();

  return (
    <Box>
      <Typography variant="h4" sx={{ color: "#fff", mb: 4, fontWeight: 700 }}>
        Quản lý rạp
      </Typography>

      <Grid container spacing={3}>
        {cinemas?.map((c) => (
          <Grid item xs={12} sm={6} md={4} key={c.id}>
            <Card sx={{ background: "#1a1a2e", color: "#fff" }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  {c.name}
                </Typography>
                <Typography sx={{ color: "#aaa", mb: 2 }}>
                  Số phòng chiếu: {c.rooms}
                </Typography>

                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => navigate(`/admin/cinemas/${c.id}`)}
                  sx={{
                    background: "#4299e1",
                    "&:hover": { background: "#3b8cd3" },
                  }}
                >
                  Quản lý rạp
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

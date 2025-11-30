import { Box, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuditoriumManager } from "../../../hooks/admin/useAuditoriumManager";
import { AuditoriumCard } from "../../../components/Admin/Auditoriums/AuditoriumCard";

export const AuditoriumList = () => {
  const { auditoriums } = useAuditoriumManager();
  const navigate = useNavigate();

  return (
    <Box sx={{ color: "white", p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Quản lý phòng chiếu
      </Typography>

      <Grid container spacing={2}>
        {auditoriums.map((a) => (
          <Grid item xs={12} md={6} lg={3} key={a.id}>
            <AuditoriumCard data={a} onClick={() => navigate(`/admin/auditoriums/${a.id}`)} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

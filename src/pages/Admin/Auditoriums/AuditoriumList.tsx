// src/pages/Admin/Auditoriums/AuditoriumList.tsx
import { Box, Grid, Typography } from "@mui/material";
import { AuditoriumCard,Auditorium } from "../../../components/Admin/Auditoriums/AuditoriumCard";
import { useAuditoriumManager } from "../../../hooks/admin/useAuditoriumManager";
import { useNavigate } from "react-router-dom";


export const AuditoriumList = () => {
  const { auditoriums } = useAuditoriumManager();
  const navigate = useNavigate();

  /** -------------------------------------------------------
   *  MAP AuditoriumLayout → Auditorium (đúng type yêu cầu)
   * ------------------------------------------------------*/
  const mapLayoutToCardData = (layout: any): Auditorium => {
    const total = layout.seats.length;

    const normal = layout.seats.filter((s: any) => s.type === "regular").length;
    const vip = layout.seats.filter((s: any) => s.type === "vip").length;
    const couple = layout.seats.filter((s: any) => s.type === "couple").length;

    return {
      id: layout.id,
      name: layout.name,
      totalSeats: total,
      normalSeats: normal,
      vipSeats: vip,
      coupleSeats: couple,
      status: "active", // TS now understands this is "active" | "maintenance"
    };
  };



  return (
    <Box sx={{ color: "white", p: 3 }}>
      <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>
        Danh Sách Phòng Chiếu
      </Typography>

      <Grid container spacing={3}>
        {auditoriums.map((a) => {
          const cardData = mapLayoutToCardData(a);

          return (
            <Grid size={{ xs:12, sm:6, md:4, lg:3}} key={a.id}>
              <AuditoriumCard
                data={cardData}
                onClick={() => navigate(`/admin/auditoriums/${a.id}`)}
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

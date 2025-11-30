import { Card, CardContent, Typography, Box } from "@mui/material";

export const AuditoriumCard = ({ data, onClick }) => {
  return (
    <Card
      onClick={onClick}
      sx={{
        background: "#1a1a2e",
        color: "white",
        cursor: "pointer",
        border: "2px solid transparent",
        "&:hover": { borderColor: "#4299e1" },
        p: 2,
      }}
    >
      <CardContent>
        <Typography variant="h6">{data.name}</Typography>
        <Typography sx={{ mt: 1 }}>{data.totalSeats} ghế</Typography>

        <Box sx={{ mt: 1 }}>
          <Typography variant="body2">Thường: {data.normalSeats}</Typography>
          <Typography variant="body2">VIP: {data.vipSeats}</Typography>
          <Typography variant="body2">Đôi: {data.coupleSeats}</Typography>
        </Box>

        <Box
          sx={{
            mt: 2,
            color: data.status === "active" ? "#4ade80" : "#facc15",
            fontSize: 14,
          }}
        >
          {data.status === "active" ? "Hoạt động" : "Bảo trì"}
        </Box>
      </CardContent>
    </Card>
  );
};

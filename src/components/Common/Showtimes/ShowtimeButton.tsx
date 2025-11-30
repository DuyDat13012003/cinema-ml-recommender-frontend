import { Box, Chip, Typography } from "@mui/material";

export const ShowtimeButton = ({ st, onClick }: any) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        px: 2,
        py: 1.2,
        borderRadius: "10px",
        backgroundColor: "#1a1a2e",
        border: "1px solid #2d2d40",
        cursor: "pointer",
        transition: "0.2s",
        "&:hover": {
          borderColor: "#4299e1",
          boxShadow: "0 0 10px rgba(66,153,225,0.3)",
        },
      }}
    >
      <Typography sx={{ fontWeight: 700, fontSize: "18px" }}>
        {st.time}
      </Typography>

      <Box sx={{ display: "flex", gap: 1, my: 1 }}>
        <Chip label={st.format} color="primary" size="small" />
        <Chip label={st.language} variant="outlined" size="small" />
      </Box>

      <Typography sx={{ fontSize: "13px", color: "#aaa" }}>
        {st.availableSeats} ghế trống
      </Typography>

      <Typography sx={{ color: "#3b82f6", fontWeight: 600, mt: 0.5 }}>
        {st.basePrice.toLocaleString()}đ
      </Typography>

      {st.isHot && (
        <Chip label="HOT" color="error" size="small" sx={{ mt: 1 }} />
      )}
      {st.isEarlyBird && (
        <Chip label="Early Bird" color="success" size="small" sx={{ mt: 1 }} />
      )}
    </Box>
  );
};

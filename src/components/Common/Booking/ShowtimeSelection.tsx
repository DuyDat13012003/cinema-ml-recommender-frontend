// src/components/Common/Booking/ShowtimeSelection.tsx
import { Box, Typography, Button, Fade, Chip } from "@mui/material";

interface Showtime {
  id: string;
  time: string;
  format: string;
  language: string;
  availableSeats: number;
}

interface Props {
  showtimes: Showtime[];
  selectedShowtimeId?: string;
  onSelectShowtime: (id: string) => void;
}

export const ShowtimeSelection = ({
  showtimes,
  selectedShowtimeId,
  onSelectShowtime,
}: Props) => {
  return (
    <Fade in timeout={300}>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ color: "#fff", fontWeight: 700, mb: 2 }}>
          Chọn Suất Chiếu
        </Typography>

        <Box sx={{ display: "flex", gap: 2, overflowX: "auto", pb: 1 }}>
          {showtimes.map((s) => {
            const soldOut = s.availableSeats === 0;

            return (
              <Button
                key={s.id}
                disabled={soldOut}
                onClick={() => onSelectShowtime(s.id)}
                sx={{
                  minWidth: 150,
                  px: 2,
                  py: 1.5,
                  borderRadius: 2,
                  border:
                    selectedShowtimeId === s.id ? "2px solid #82c6ff" : "1px solid #333",
                  backgroundColor:
                    selectedShowtimeId === s.id ? "#4299e1" : "#1a1a2e",
                  color: soldOut ? "#777" : "#fff",
                  opacity: soldOut ? 0.5 : 1,
                  "&:hover": soldOut
                    ? {}
                    : { backgroundColor: "#2b2b44", transform: "scale(1.03)" },
                }}
              >
                <Box sx={{ width: "100%" }}>
                  <Typography sx={{ fontSize: "1.1rem", fontWeight: 700 }}>
                    {s.time}
                  </Typography>
                  <Typography sx={{ fontSize: "0.85rem", color: "#aaa" }}>
                    {s.format} • {s.language}
                  </Typography>

                  <Chip
                    label={
                      soldOut
                        ? "Hết vé"
                        : `Còn ${s.availableSeats} ghế`
                    }
                    size="small"
                    sx={{
                      mt: 1,
                      backgroundColor: soldOut ? "#444" : "#3b8cd3",
                      color: "#fff",
                    }}
                  />
                </Box>
              </Button>
            );
          })}
        </Box>
      </Box>
    </Fade>
  );
};

// src/components/Common/Booking/CinemaSelection.tsx
import { Box, Typography, Card, CardContent, Chip, Fade } from "@mui/material";

interface Cinema {
  id: string;
  name: string;
  address: string;
  distance: number;
}

interface Props {
  cinemas: Cinema[];
  selectedCinemaId?: string;
  onSelectCinema: (id: string) => void;
}

export const CinemaSelection = ({
  cinemas,
  selectedCinemaId,
  onSelectCinema,
}: Props) => {
  return (
    <Fade in timeout={300}>
      <Box>
        <Typography variant="h6" sx={{ color: "#fff", fontWeight: 700, mb: 2 }}>
          Chọn Rạp
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {cinemas.map((c) => {
            const isSelected = selectedCinemaId === c.id;

            return (
              <Card
                key={c.id}
                onClick={() => onSelectCinema(c.id)}
                sx={{
                  backgroundColor: isSelected ? "#4299e1" : "#1a1a2e",
                  color: "#fff",
                  cursor: "pointer",
                  border: isSelected ? "2px solid #82c6ff" : "1px solid #333",
                  transition: "0.2s ease",
                  "&:hover": { transform: "scale(1.02)" },
                }}
              >
                <CardContent>
                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Box>
                      <Typography sx={{ fontWeight: 700 }}>{c.name}</Typography>
                      <Typography sx={{ fontSize: "0.9rem", color: "#ccc" }}>
                        {c.address}
                      </Typography>
                    </Box>

                    {c.distance <= 3 && (
                      <Chip
                        label="Gần bạn"
                        sx={{
                          backgroundColor: "#3b8cd3",
                          color: "#fff",
                          height: 24,
                        }}
                      />
                    )}
                  </Box>
                </CardContent>
              </Card>
            );
          })}
        </Box>
      </Box>
    </Fade>
  );
};

// ==========================
// AuditoriumSeatMap.tsx
// ==========================

import { Box } from "@mui/material";

export interface Seat {
  id: string;
  row: string;
  number: number;
  type: "regular" | "vip" | "couple" | "sweetbox" | "disabled";
  status: "available" | "booked";
}

interface AuditoriumSeatMapProps {
  seats: Seat[];
  mode: "view" | "edit";
  onChange?: (seat: Seat) => void;
}

export const AuditoriumSeatMap = ({ seats, mode, onChange }: AuditoriumSeatMapProps) => {
  // Group theo row
  const grouped = seats.reduce((acc: Record<string, Seat[]>, seat) => {
    if (!acc[seat.row]) acc[seat.row] = [];
    acc[seat.row].push(seat);
    return acc;
  }, {});

  // Map type → màu
  const typeColorMap: Record<Seat["type"], string> = {
    regular: "#3498db",    // Ghế thường
    vip: "#e91e63",        // Ghế VIP
    couple: "#ff9800",     // Ghế đôi
    sweetbox: "#9b59b6",   // Sweetbox (2 người)
    disabled: "#95a5a6",   // Ghế không dùng
  };

  const handleClick = (seat: Seat) => {
    if (mode === "edit" && onChange) onChange(seat);
  };

  return (
    <Box sx={{ display: "inline-block", p: 2, bgcolor: "#111827", borderRadius: 2 }}>
      {Object.keys(grouped).map((row) => (
        <Box key={row} sx={{ display: "flex", gap: 1, mb: 1 }}>
          {grouped[row]
            .sort((a, b) => a.number - b.number)
            .map((seat) => {
              const color = typeColorMap[seat.type];

              return (
                <Box
                  key={seat.id}
                  onClick={() => handleClick(seat)}
                  sx={{
                    width: 28,
                    height: 28,
                    bgcolor: color,
                    borderRadius: "4px",
                    cursor: mode === "edit" ? "pointer" : "default",
                    opacity: seat.status === "booked" ? 0.4 : 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "12px",
                    color: "white",
                    border: "1px solid rgba(255,255,255,0.2)",
                    "&:hover": {
                      opacity: mode === "edit" ? 0.8 : 1,
                    },
                  }}
                >
                  {seat.number}
                </Box>
              );
            })}
        </Box>
      ))}
    </Box>
  );
};

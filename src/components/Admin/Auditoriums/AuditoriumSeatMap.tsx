import { Box, Tooltip } from "@mui/material";
import { Seat } from "../../../hooks/admin/useAuditoriumManager";

interface AuditoriumSeatMapProps {
  seats: Seat[];
  mode: "view" | "edit";
  onChange: (seat: Seat) => void;
}

export const AuditoriumSeatMap = ({
  seats,
  mode,
  onChange,
}: AuditoriumSeatMapProps) => {
  const grouped = seats.reduce((acc: Record<string, Seat[]>, seat) => {
    if (!acc[seat.row]) acc[seat.row] = [];
    acc[seat.row].push(seat);
    return acc;
  }, {});

  const handleClick = (seat: Seat) => {
      if (mode !== "edit") return;

      const next =
        seat.type === "normal"
          ? "vip"
          : seat.type === "vip"
          ? "couple"
          : "normal";

      onChange({ ...seat, type: next });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      {Object.entries(grouped).map(([row, rowSeats]) => (
        <Box key={row} sx={{ display: "flex", gap: 0.5, alignItems: "center" }}>
          <Box sx={{ width: 20, textAlign: "right", color: "#bbb" }}>{row}</Box>

          {rowSeats.map((seat) => (
            <Tooltip
              key={seat.id}
              title={`Ghế ${seat.row}${seat.number} - ${seat.type}`}
            >
              <Box
                onClick={() => handleClick(seat)}
                sx={{
                  width: 28,
                  height: 28,
                  borderRadius: 0.5,
                  cursor: mode === "edit" ? "pointer" : "default",
                  background:
                    seat.type === "normal"
                      ? "#444"
                      : seat.type === "vip"
                      ? "#f7b500"
                      : "#ff3b81",
                  "&:hover": {
                    opacity: mode === "edit" ? 0.8 : 1,
                  },
                }}
              />
            </Tooltip>
          ))}

          <Box sx={{ width: 20, color: "#bbb" }}>{row}</Box>
        </Box>
      ))}
    </Box>
  );
};

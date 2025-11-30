// src/components/Common/Booking/SeatSelection.tsx
import { Box, Typography, Container, Button, Tooltip } from "@mui/material";
import { useState } from "react";
import { BookingSeat } from "../../../hooks/useSeats";

interface SeatSelectionProps {
  seats: BookingSeat[];
  onSelectSeats: (seats: BookingSeat[]) => void;
}

export const SeatSelection = ({ seats, onSelectSeats }: SeatSelectionProps) => {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  // ==========================
  // HANDLE SEAT CLICK
  // ==========================
  const handleSeatClick = (seat: BookingSeat) => {
    if (seat.status === "booked" || seat.status === "pending") return;

    // GHẾ ĐÔI
    if (seat.type === "couple" && seat.pairId) {
      const pairSeats = seats.filter((s) => s.pairId === seat.pairId);

      const bothSelected = pairSeats.every((s) =>
        selectedSeats.includes(s.id)
      );

      const updated = bothSelected
        ? selectedSeats.filter((id) => !pairSeats.some((s) => s.id === id))
        : [...selectedSeats, ...pairSeats.map((s) => s.id)];

      setSelectedSeats(updated);
      onSelectSeats(seats.filter((s) => updated.includes(s.id)));
      return;
    }

    // GHẾ THƯỜNG / VIP
    const updated = selectedSeats.includes(seat.id)
      ? selectedSeats.filter((id) => id !== seat.id)
      : [...selectedSeats, seat.id];

    setSelectedSeats(updated);
    onSelectSeats(seats.filter((s) => updated.includes(s.id)));
  };

  // ==========================
  // GROUP BY ROW
  // ==========================
  const seatsByRow = seats.reduce((acc, seat) => {
    if (!acc[seat.row]) acc[seat.row] = [];
    acc[seat.row].push(seat);
    return acc;
  }, {} as Record<string, BookingSeat[]>);

  // ==========================
  // RENDER
  // ==========================
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h5" sx={{ color: "#fff", fontWeight: 700, mb: 4 }}>
        Chọn Ghế
      </Typography>

      {/* Legend */}
      <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap", mb: 3 }}>
        <Legend color="#4299e1" label="Đang chọn" />
        <Legend color="#333" label="Thường" />
        <Legend color="#ff4444" label="VIP" />
        <Legend color="#ff77aa" label="Đôi" />
        <Legend color="#666" label="Đã đặt" />
        <Legend color="#e6c200" label="Đang giữ" />
      </Box>

      {/* Screen */}
      <Box
        sx={{
          textAlign: "center",
          mb: 4,
          p: 2,
          backgroundColor: "rgba(66, 153, 225, 0.1)",
          borderRadius: 2,
          borderTop: "3px solid #4299e1",
        }}
      >
        <Typography variant="h6" sx={{ color: "#4299e1", fontWeight: 600 }}>
          🎬 MÀN HÌNH
        </Typography>
      </Box>

      {/* Seat Grid */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {Object.entries(seatsByRow).map(([row, rowSeats]) => (
          <Box key={row} sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <Typography sx={{ width: 30, color: "#aaa", fontWeight: 600 }}>
              {row}
            </Typography>

            <Box sx={{ display: "flex", gap: 1 }}>
              {rowSeats.map((seat) => {
                const isSelected = selectedSeats.includes(seat.id);
                const price = seat.basePrice + seat.extraPrice;

                // COLOR
                const bgColor = isSelected
                  ? "#4299e1"
                  : seat.status === "booked"
                  ? "#666"
                  : seat.status === "pending"
                  ? "#e6c200"
                  : seat.type === "vip"
                  ? "#ff4444"
                  : seat.type === "couple"
                  ? "#ff77aa"
                  : "#333";

                const border =
                  seat.type === "vip"
                    ? "2px solid gold"
                    : isSelected
                    ? "2px solid #82c6ff"
                    : "2px solid transparent";

                return (
                  <Tooltip
                    key={seat.id}
                    title={`${seat.row}${seat.number} • ${seat.type.toUpperCase()} • ${price.toLocaleString()}đ`}
                  >
                    <Button
                      onClick={() => handleSeatClick(seat)}
                      disabled={seat.status !== "available"}
                      sx={{
                        width: 38,
                        height: 38,
                        minWidth: 38,
                        p: 0,
                        mx:
                          seat.type === "couple" && seat.number % 2 === 1
                            ? 1
                            : 0,
                        borderRadius: 1,
                        backgroundColor: bgColor,
                        border,
                        transition: "all 0.2s ease",
                        "&:hover:not(:disabled)": {
                          transform: "scale(1.12)",
                          backgroundColor: "#4299e1",
                        },
                      }}
                    >
                      <Typography sx={{ fontSize: "0.8rem", fontWeight: 600 }}>
                        {seat.number}
                      </Typography>
                    </Button>
                  </Tooltip>
                );
              })}
            </Box>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

const Legend = ({ color, label }: { color: string; label: string }) => (
  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
    <Box sx={{ width: 28, height: 28, backgroundColor: color, borderRadius: 1 }} />
    <Typography sx={{ color: "#aaa" }}>{label}</Typography>
  </Box>
);

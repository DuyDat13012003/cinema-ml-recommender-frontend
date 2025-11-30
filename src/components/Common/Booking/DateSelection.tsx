// src/components/Common/Booking/DateSelection.tsx
import { Box, Typography, Button, Fade, Chip } from "@mui/material";
import { format, addDays, isToday } from "date-fns";
import { vi } from "date-fns/locale";

interface DateSelectionProps {
  selectedDate?: string;
  onSelectDate: (date: string) => void;
}

export const DateSelection = ({ selectedDate, onSelectDate }: DateSelectionProps) => {
  const dates = Array.from({ length: 7 }).map((_, index) => {
    const date = addDays(new Date(), index);
    return {
      label: format(date, "EEE, dd/MM", { locale: vi }),
      raw: format(date, "yyyy-MM-dd"),
      isToday: isToday(date),
    };
  });

  return (
    <Fade in timeout={300}>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ color: "#fff", fontWeight: 700, mb: 2 }}>
          Chọn Ngày
        </Typography>

        <Box sx={{ display: "flex", gap: 2, overflowX: "auto", pb: 1 }}>
          {dates.map((d) => (
            <Button
              key={d.raw}
              onClick={() => onSelectDate(d.raw)}
              sx={{
                minWidth: 130,
                px: 2,
                py: 1.5,
                borderRadius: 2,
                backgroundColor: selectedDate === d.raw ? "#4299e1" : "#1a1a2e",
                color: "#fff",
                border: selectedDate === d.raw ? "1px solid #82c6ff" : "1px solid #333",
                transition: "0.2s ease",
                "&:hover": {
                  backgroundColor: selectedDate === d.raw ? "#3b8cd3" : "#222",
                },
              }}
            >
              <Box sx={{ textAlign: "left" }}>
                <Typography sx={{ fontWeight: 600 }}>{d.label}</Typography>
                {d.isToday && (
                  <Chip
                    label="Hôm nay"
                    size="small"
                    sx={{
                      mt: 0.5,
                      backgroundColor: "#4299e1",
                      color: "#fff",
                      height: 22,
                    }}
                  />
                )}
              </Box>
            </Button>
          ))}
        </Box>
      </Box>
    </Fade>
  );
};

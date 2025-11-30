// src/components/Common/Booking/PaymentSummary.tsx
import { Box, Typography, Divider, Button, Card, CardContent } from "@mui/material";

interface Summary {
  movieTitle: string;
  cinemaName: string;
  date: string;
  time: string;
  seats: any[];
  subtotal: number;
  tax: number;
  total: number;
}

interface Props {
  summary: Summary;
  onConfirmBooking: () => void;
}

export const PaymentSummary = ({ summary, onConfirmBooking }: Props) => {
  return (
    <Card sx={{ backgroundColor: "#151528", color: "#fff", borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Tóm Tắt Thanh Toán
        </Typography>

        <Box sx={{ mt: 2 }}>
          <Row label="Phim" value={summary.movieTitle} />
          <Row label="Rạp" value={summary.cinemaName} />
          <Row label="Ngày" value={summary.date} />
          <Row label="Giờ" value={summary.time} />
          <Row
            label="Ghế"
            value={summary.seats.map((s) => `${s.row}${s.number}`).join(", ")}
          />
        </Box>

        <Divider sx={{ my: 2, borderColor: "#333" }} />

        <Row
          label="Tạm tính"
          value={summary.subtotal.toLocaleString() + "đ"}
        />
        <Row label="Thuế (10%)" value={summary.tax.toLocaleString() + "đ"} />

        <Typography
          sx={{
            fontSize: "1.3rem",
            fontWeight: 700,
            textAlign: "right",
            color: "#4aa3ff",
            mt: 2,
          }}
        >
          Tổng: {summary.total.toLocaleString()}đ
        </Typography>

        <Button
          fullWidth
          variant="contained"
          sx={{
            mt: 3,
            py: 1.5,
            backgroundColor: "#4299e1",
            fontWeight: 700,
            "&:hover": { backgroundColor: "#3b8cd3" },
          }}
          onClick={onConfirmBooking}
        >
          Xác nhận đặt vé
        </Button>
      </CardContent>
    </Card>
  );
};

const Row = ({ label, value }: { label: string; value: string }) => (
  <Box sx={{ display: "flex", justifyContent: "space-between", my: 0.5 }}>
    <Typography sx={{ color: "#aaa" }}>{label}</Typography>
    <Typography sx={{ fontWeight: 600 }}>{value}</Typography>
  </Box>
);

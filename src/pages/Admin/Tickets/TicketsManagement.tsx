// src/pages/Admin/Tickets/TicketsManagement.tsx
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  MenuItem,
  IconButton,
  Chip,
  Button,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { TicketDetailModal } from "../../../components/Admin/Tickets/TicketDetailModal";
import { CancelTicketModal } from "../../../components/Admin/Tickets/CancelTicketModal";
// ======================= TYPES =======================
type TicketStatus = "confirmed" | "pending" | "cancelled";

interface Ticket {
  id: string;
  customer: string;
  email: string;
  movie: string;
  showtime: string;
  room: string;
  seats: string;
  price: number;
  status: TicketStatus;
}

// ======================= MAIN COMPONENT =======================
export const TicketsManagement = () => {
  // Fake data
  const ticketData: Ticket[] = [
    {
      id: "TK001247",
      customer: "Nguyễn Văn A",
      email: "nguyenvana@email.com",
      movie: "Godzilla x Kong",
      showtime: "10/11/2025 14:30",
      room: "P1",
      seats: "A5, A6",
      price: 180000,
      status: "confirmed",
    },
    {
      id: "TK001248",
      customer: "Trần Thị B",
      email: "tranthib@email.com",
      movie: "Dune: Part Two",
      showtime: "10/11/2025 15:00",
      room: "P3",
      seats: "D7, D8",
      price: 200000,
      status: "confirmed",
    },
    {
      id: "TK001249",
      customer: "Lê Văn C",
      email: "levanc@email.com",
      movie: "Kung Fu Panda 4",
      showtime: "10/11/2025 15:30",
      room: "P2",
      seats: "C3, C4, C5",
      price: 240000,
      status: "pending",
    },
    {
      id: "TK001250",
      customer: "Phạm Thị D",
      email: "phamthid@email.com",
      movie: "Civil War",
      showtime: "10/11/2025 16:00",
      room: "P4",
      seats: "H8, H9",
      price: 220000,
      status: "cancelled",
    },
    {
      id: "TK001251",
      customer: "Hoàng Văn E",
      email: "hoangvane@email.com",
      movie: "Godzilla x Kong",
      showtime: "10/11/2025 18:00",
      room: "P1",
      seats: "E10, E11",
      price: 220000,
      status: "confirmed",
    },
  ];

  const [statusFilter, setStatusFilter] = useState<"all" | TicketStatus>("all");
  const [search, setSearch] = useState("");
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const [cancelOpen, setCancelOpen] = useState(false);
  const [ticketToCancel, setTicketToCancel] = useState<string>("");
  // ======================= STATUS LABELS =======================
  const statusLabel: Record<TicketStatus, { text: string; color: string }> = {
    confirmed: { text: "Đã xác nhận", color: "#22c55e" },
    pending: { text: "Chờ xử lý", color: "#eab308" },
    cancelled: { text: "Đã hủy", color: "#ef4444" },
  };

  // ======================= FILTERED DATA =======================
  const filteredTickets = ticketData.filter((t) => {
    const matchSearch =
      t.id.toLowerCase().includes(search.toLowerCase()) ||
      t.customer.toLowerCase().includes(search.toLowerCase()) ||
      t.movie.toLowerCase().includes(search.toLowerCase());

    const matchStatus = statusFilter === "all" || t.status === statusFilter;

    return matchSearch && matchStatus;
  });

  // ======================= UI =======================
  return (
    <Box sx={{ color: "white" }}>
      {/* Title */}
      <Typography variant="h4" sx={{ mb: 1, fontWeight: 700 }}>
        Quản Lý Vé và Đặt Chỗ
      </Typography>
      <Typography sx={{ opacity: 0.7, mb: 4 }}>
        Xem danh sách vé đã đặt, trạng thái ghế và xử lý yêu cầu
      </Typography>

      {/* ===== STAT CARDS ===== */}
      <Box sx={{ display: "flex", gap: 3, mb: 4, flexWrap: "wrap" }}>
        {/* Tổng vé hôm nay */}
        <Card sx={{ background: "#151925", borderRadius: "12px", width: 330 }}>
          <CardContent>
            <Typography sx={{ opacity: 0.7 }}>Tổng vé hôm nay</Typography>
            <Typography sx={{ fontSize: 32, fontWeight: 700, mt: 1 }}>
              1,247 vé
            </Typography>
            <Typography sx={{ mt: 1, color: "#22c55e", fontWeight: 500 }}>
              +12.5% so với hôm qua
            </Typography>
          </CardContent>
        </Card>

        {/* Chờ xử lý */}
        <Card sx={{ background: "#151925", borderRadius: "12px", width: 330 }}>
          <CardContent>
            <Typography sx={{ opacity: 0.7 }}>Chờ xử lý</Typography>
            <Typography sx={{ fontSize: 32, fontWeight: 700, mt: 1 }}>
              23 vé
            </Typography>
            <Typography sx={{ mt: 1, color: "#eab308", fontWeight: 500 }}>
              Cần xác nhận
            </Typography>
          </CardContent>
        </Card>

        {/* Đã hủy */}
        <Card sx={{ background: "#151925", borderRadius: "12px", width: 330 }}>
          <CardContent>
            <Typography sx={{ opacity: 0.7 }}>Đã hủy</Typography>
            <Typography sx={{ fontSize: 32, fontWeight: 700, mt: 1 }}>
              15 vé
            </Typography>
            <Typography sx={{ mt: 1, color: "#ef4444", fontWeight: 500 }}>
              -3.2% so với hôm qua
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* ===== SEARCH BAR + FILTER ===== */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          mb: 3,
          alignItems: "center",
        }}
      >
        <TextField
          placeholder="Tìm kiếm theo mã vé, tên khách hàng, phim…"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
          sx={{
            input: { color: "white" },
            background: "#1b1f2e",
            borderRadius: "8px",
          }}
        />

        <TextField
          select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as any)}
          sx={{
            width: 200,
            background: "#1b1f2e",
            borderRadius: "8px",
            ".MuiSelect-select": { color: "white" },
          }}
        >
          <MenuItem value="all">Tất cả trạng thái</MenuItem>
          <MenuItem value="confirmed">Đã xác nhận</MenuItem>
          <MenuItem value="pending">Chờ xử lý</MenuItem>
          <MenuItem value="cancelled">Đã hủy</MenuItem>
        </TextField>
      </Box>

      {/* ===== TABLE ===== */}
      <Box
        sx={{
          background: "#151925",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns:
              "140px 200px 250px 200px 150px 150px 150px 100px",
            px: 3,
            py: 2,
            background: "#0f1624",
            opacity: 0.8,
            fontWeight: 600,
          }}
        >
          <Typography>Mã Vé</Typography>
          <Typography>Khách Hàng</Typography>
          <Typography>Phim</Typography>
          <Typography>Suất Chiếu</Typography>
          <Typography>Ghế</Typography>
          <Typography>Tổng Tiền</Typography>
          <Typography>Trạng Thái</Typography>
          <Typography>Thao Tác</Typography>
        </Box>

        {/* Rows */}
        {filteredTickets.map((t) => (
          <Box
            key={t.id}
            sx={{
              display: "grid",
              gridTemplateColumns:
                "140px 200px 250px 200px 150px 150px 150px 100px",
              px: 3,
              py: 2,
              borderTop: "1px solid #1f2535",
              alignItems: "center",
            }}
          >
            <Typography>{t.id}</Typography>

            <Box>
              <Typography>{t.customer}</Typography>
              <Typography sx={{ fontSize: 13, opacity: 0.7 }}>
                {t.email}
              </Typography>
            </Box>

            <Typography>{t.movie}</Typography>

            <Box>
              <Typography>{t.showtime}</Typography>
              <Typography sx={{ fontSize: 13, opacity: 0.7 }}>
                {t.room}
              </Typography>
            </Box>

            <Typography>{t.seats}</Typography>

            <Typography>{t.price.toLocaleString()} đ</Typography>

            {/* Badge trạng thái */}
            <Chip
              label={statusLabel[t.status].text}
              sx={{
                background: statusLabel[t.status].color,
                color: "white",
                fontWeight: 600,
              }}
            />

            <Box sx={{ display: "flex", gap: 1 }}>
              <IconButton
                sx={{ color: "#fff" }}
                onClick={() => {
                  setSelectedTicket(t);
                  setDetailOpen(true);
                }}
              >
                <VisibilityIcon />
              </IconButton>

              {t.status !== "cancelled" && (
                <IconButton
                  sx={{ color: "#ef4444" }}
                  onClick={() => {
                    setTicketToCancel(t.id);
                    setCancelOpen(true);
                  }}
                >
                  <CloseIcon />
                </IconButton>
              )}
            </Box>

          </Box>
        ))}
      </Box>
            <TicketDetailModal
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
        ticket={selectedTicket}
      />

      <CancelTicketModal
        open={cancelOpen}
        onClose={() => setCancelOpen(false)}
        ticketId={ticketToCancel}
        onConfirm={() => {
          console.log("Hủy vé:", ticketToCancel);
          setCancelOpen(false);
        }}
      />
    </Box>
  );
};

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
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";

import { useState } from "react";
import { TicketDetailModal } from "../../../components/Admin/Tickets/TicketDetailModal";
import { CancelTicketModal } from "../../../components/Admin/Tickets/CancelTicketModal";

import {
  useAdminTickets,
  Ticket,
  DateFilter,
  TicketStatus,
} from "../../../hooks/admin/useAdminTickets";

export const TicketsManagement = () => {
  const {
    tickets,
    stats,
    filterDate,
    setFilterDate,
    filterStatus,
    setFilterStatus,
    search,
    setSearch,
  } = useAdminTickets();

  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const [cancelOpen, setCancelOpen] = useState(false);
  const [ticketToCancel, setTicketToCancel] = useState<string>("");

  // STATUS BADGE
  const statusLabel: Record<TicketStatus, { text: string; color: string }> = {
    confirmed: { text: "Đã xác nhận", color: "#22c55e" },
    pending: { text: "Chờ xử lý", color: "#eab308" },
    cancelled: { text: "Đã hủy", color: "#ef4444" },
  };

  // DATE FILTER LABEL
  const dateOptions: { value: DateFilter; label: string }[] = [
    { value: "today", label: "Hôm nay" },
    { value: "yesterday", label: "Hôm qua" },
    { value: "last7days", label: "7 ngày qua" },
    { value: "thisMonth", label: "Tháng này" },
    { value: "lastMonth", label: "Tháng trước" },
    { value: "all", label: "Tất cả" },
  ];

  return (
    <Box sx={{ color: "white" }}>
      {/* TITLE */}
      <Typography variant="h4" sx={{ mb: 1, fontWeight: 700 }}>
        Quản Lý Vé và Đặt Chỗ
      </Typography>
      <Typography sx={{ opacity: 0.7, mb: 4 }}>
        Xem danh sách vé theo ngày, trạng thái, thống kê doanh thu
      </Typography>

      {/* ===== STAT CARDS ===== */}
      <Box sx={{ display: "flex", gap: 3, mb: 4, flexWrap: "wrap" }}>
        {/* Tổng vé */}
        <Card sx={{ background: "#151925", borderRadius: "12px", width: 330 }}>
          <CardContent>
            <Typography sx={{ opacity: 0.7 }}>Tổng vé</Typography>
            <Typography sx={{ fontSize: 32, fontWeight: 700, mt: 1 }}>
              {stats.total.toLocaleString()} vé
            </Typography>
          </CardContent>
        </Card>

        {/* Chờ xử lý */}
        <Card sx={{ background: "#151925", borderRadius: "12px", width: 330 }}>
          <CardContent>
            <Typography sx={{ opacity: 0.7 }}>Chờ xử lý</Typography>
            <Typography sx={{ fontSize: 32, fontWeight: 700, mt: 1 }}>
              {stats.pending}
            </Typography>
            <Typography sx={{ mt: 1, color: "#eab308" }}>Cần xác nhận</Typography>
          </CardContent>
        </Card>

        {/* Đã hủy */}
        <Card sx={{ background: "#151925", borderRadius: "12px", width: 330 }}>
          <CardContent>
            <Typography sx={{ opacity: 0.7 }}>Đã hủy</Typography>
            <Typography sx={{ fontSize: 32, fontWeight: 700, mt: 1 }}>
              {stats.cancelled}
            </Typography>
            <Typography sx={{ mt: 1, color: "#ef4444" }}>
              Theo lọc thời gian
            </Typography>
          </CardContent>
        </Card>

        {/* Doanh thu */}
        <Card sx={{ background: "#151925", borderRadius: "12px", width: 330 }}>
          <CardContent>
            <Typography sx={{ opacity: 0.7 }}>Doanh thu</Typography>
            <Typography sx={{ fontSize: 32, fontWeight: 700, mt: 1 }}>
              {stats.totalRevenue.toLocaleString()} đ
            </Typography>
            <Typography sx={{ mt: 1, color: "#22c55e" }}>
              Tổng theo bộ lọc
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* ===== FILTER BAR ===== */}
      <Box sx={{ display: "flex", gap: 2, mb: 3, alignItems: "center" }}>
        {/* Search */}
        <TextField
          placeholder="Tìm kiếm mã vé, tên khách hàng, phim…"
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

        {/* Date Filter */}
        <TextField
          select
          label="Thời gian"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value as DateFilter)}
          sx={{
            width: 220,
            background: "#1b1f2e",
            borderRadius: "8px",
            ".MuiSelect-select": { color: "white" },
            label: { color: "#ccc" },
          }}
        >
          {dateOptions.map((d) => (
            <MenuItem key={d.value} value={d.value}>
              {d.label}
            </MenuItem>
          ))}
        </TextField>

        {/* Status Filter */}
        <TextField
          select
          label="Trạng thái"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as TicketStatus | "all")}
          sx={{
            width: 200,
            background: "#1b1f2e",
            borderRadius: "8px",
            ".MuiSelect-select": { color: "white" },
            label: { color: "#ccc" },
          }}
        >
          <MenuItem value="all">Tất cả</MenuItem>
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
        {tickets.map((t) => (
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

            <Chip
              label={statusLabel[t.status].text}
              sx={{
                background: statusLabel[t.status].color,
                color: "white",
                fontWeight: 600,
              }}
            />

            {/* ACTIONS */}
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

      {/* MODALS */}
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

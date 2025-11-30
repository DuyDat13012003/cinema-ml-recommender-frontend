import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  Chip,
  Divider,
  Button,
} from "@mui/material";

import { User } from "../../../api/usersApi";

interface Props {
  user: User;
  onClose: () => void;
}

export const UserViewModal = ({ user, onClose }: Props) => {
  // Badge role màu sắc theo yêu cầu A + C
  const renderRoleBadge = (role: string) => {
    const map: Record<string, string> = {
      "Khách hàng": "#3b82f6",
      "Nhân viên": "#10b981",
      "Quản trị viên": "#ef4444",
    };

    return (
      <Chip
        label={role}
        sx={{
          backgroundColor: map[role],
          color: "white",
          fontWeight: 700,
          fontSize: "14px",
        }}
      />
    );
  };

  // Badge trạng thái
  const renderStatus = (status: string) => (
    <Chip
      label={status === "active" ? "Đang hoạt động" : "Vô hiệu hóa"}
      sx={{
        backgroundColor: status === "active" ? "#4ade80" : "#ef4444",
        color: "#000",
        fontWeight: 600,
      }}
    />
  );

  return (
    <Dialog
      open
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          background: "#0f172a",
          color: "white",
          borderRadius: "12px",
          p: 1,
        },
      }}
    >
      <DialogTitle sx={{ fontWeight: 800 }}>👤 Thông tin người dùng</DialogTitle>

      <DialogContent>
        {/* Avatar */}
        <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
          <img
            src={user.avatarUrl}
            alt={user.name}
            style={{
              width: 120,
              height: 120,
              borderRadius: "50%",
              objectFit: "cover",
              border: "3px solid #3b82f6",
            }}
          />
        </Box>

        {/* Tên + Role + Status */}
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Typography variant="h5" fontWeight={700}>
            {user.name}
          </Typography>

          <Box sx={{ mt: 1, display: "flex", justifyContent: "center", gap: 1 }}>
            {renderRoleBadge(user.role)}
            {renderStatus(user.status)}
          </Box>
        </Box>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", mb: 3 }} />

        {/* Chi tiết */}
        <Box sx={{ display: "grid", gap: 2 }}>
          <DetailRow label="Email" value={user.email} />
          <DetailRow label="Số điện thoại" value={user.phone} />
          <DetailRow label="Ngày tham gia" value={user.joinDate} />
          <DetailRow label="Tổng số vé" value={user.totalTickets} />
          <DetailRow
            label="Tổng chi tiêu"
            value={user.totalSpent.toLocaleString() + "đ"}
          />
        </Box>

        <Box sx={{ textAlign: "right", mt: 4 }}>
          <Button
            onClick={onClose}
            variant="contained"
            sx={{
              backgroundColor: "#3b82f6",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#2563eb",
              },
            }}
          >
            Đóng
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

const DetailRow = ({ label, value }: { label: string; value: string | number }) => (
  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
    <Typography sx={{ opacity: 0.7 }}>{label}</Typography>
    <Typography sx={{ fontWeight: 600 }}>{value}</Typography>
  </Box>
);

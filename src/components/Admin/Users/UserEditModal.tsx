import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Box,
  Typography,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import { User, UserRole } from "../../../api/usersApi";
import { useUsers } from "../../../hooks/useUsers";

interface Props {
  user: User;
  onClose: () => void;
}

export const UserEditModal = ({ user, onClose }: Props) => {
  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role as UserRole,
    status: user.status,
  });

  const { updateUser } = useUsers({
    role: "Tất cả",
    search: "",
  });

  const handleSave = async () => {
    await updateUser({
      id: user.id,
      data: form,
    });
    onClose();
  };

  const handleChange = (field: string, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

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
      <DialogTitle sx={{ fontWeight: 800 }}>✏️ Chỉnh sửa người dùng</DialogTitle>

      <DialogContent>
        {/* Avatar Preview */}
        <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
          <img
            src={user.avatarUrl}
            alt={user.name}
            style={{
              width: 100,
              height: 100,
              borderRadius: "50%",
              border: "3px solid #3b82f6",
              objectFit: "cover",
            }}
          />
        </Box>

        <Box sx={{ display: "grid", gap: 2 }}>
          {/* Name */}
          <TextField
            label="Tên người dùng"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            fullWidth
            InputLabelProps={{ sx: { color: "#ccc" } }}
            InputProps={{
              sx: { color: "white" },
            }}
          />

          {/* Email */}
          <TextField
            label="Email"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
            fullWidth
            InputLabelProps={{ sx: { color: "#ccc" } }}
            InputProps={{ sx: { color: "white" } }}
          />

          {/* Phone */}
          <TextField
            label="Số điện thoại"
            value={form.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            fullWidth
            InputLabelProps={{ sx: { color: "#ccc" } }}
            InputProps={{ sx: { color: "white" } }}
          />

          {/* Role */}
          <TextField
            select
            label="Vai trò"
            value={form.role}
            onChange={(e) => handleChange("role", e.target.value)}
            fullWidth
            InputLabelProps={{ sx: { color: "#ccc" } }}
            InputProps={{ sx: { color: "white" } }}
          >
            <MenuItem value="Khách hàng">Khách hàng</MenuItem>
            <MenuItem value="Nhân viên">Nhân viên</MenuItem>
            <MenuItem value="Quản trị viên">Quản trị viên</MenuItem>
          </TextField>

          {/* Status */}
          <TextField
            select
            label="Trạng thái"
            value={form.status}
            onChange={(e) => handleChange("status", e.target.value)}
            fullWidth
            InputLabelProps={{ sx: { color: "#ccc" } }}
            InputProps={{ sx: { color: "white" } }}
          >
            <MenuItem value="active">Đang hoạt động</MenuItem>
            <MenuItem value="inactive">Vô hiệu hóa</MenuItem>
          </TextField>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button
          onClick={onClose}
          sx={{
            color: "#ddd",
            textTransform: "none",
          }}
        >
          Hủy
        </Button>

        <Button
          variant="contained"
          onClick={handleSave}
          sx={{
            backgroundColor: "#3b82f6",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#2563eb",
            },
          }}
        >
          Lưu thay đổi
        </Button>
      </DialogActions>
    </Dialog>
  );
};

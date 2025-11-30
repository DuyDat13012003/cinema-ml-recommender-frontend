import {
  Box,
  Button,
  Modal,
  Typography,
  TextField,
  Grid,
  MenuItem,
} from "@mui/material";
import React from "react";

interface EditCinemaModalProps {
  open: boolean;
  onClose: () => void;
  cinema: any; // hoặc Cinema nếu bạn có interface
  onSave: (data: any) => void;
}

export const EditCinemaModal = ({
  open,
  onClose,
  cinema,
  onSave,
}: EditCinemaModalProps) => {
  const [form, setForm] = React.useState(cinema);

  React.useEffect(() => {
    setForm(cinema);
  }, [cinema]);

  const handleChange = (key: string, value: any) => {
    setForm({ ...form, [key]: value });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          width: "600px",
          bgcolor: "#1b1f2e",
          color: "white",
          p: 4,
          borderRadius: 2,
          mx: "auto",
          mt: "5%",
        }}
      >
        <Typography variant="h6" sx={{ mb: 3 }}>
          Chỉnh Sửa Thông Tin Rạp
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Tên Rạp"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              InputLabelProps={{ style: { color: "#bbb" } }}
              sx={{ input: { color: "white" } }}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Thành Phố"
              value={form.city}
              onChange={(e) => handleChange("city", e.target.value)}
              InputLabelProps={{ style: { color: "#bbb" } }}
              sx={{ input: { color: "white" } }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Địa Chỉ"
              value={form.address}
              onChange={(e) => handleChange("address", e.target.value)}
              InputLabelProps={{ style: { color: "#bbb" } }}
              sx={{ input: { color: "white" } }}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Số Điện Thoại"
              value={form.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              InputLabelProps={{ style: { color: "#bbb" } }}
              sx={{ input: { color: "white" } }}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Email"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              InputLabelProps={{ style: { color: "#bbb" } }}
              sx={{ input: { color: "white" } }}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Số Phòng Chiếu"
              value={form.rooms}
              onChange={(e) => handleChange("rooms", e.target.value)}
              InputLabelProps={{ style: { color: "#bbb" } }}
              sx={{ input: { color: "white" } }}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Tổng Ghế"
              value={form.seats}
              onChange={(e) => handleChange("seats", e.target.value)}
              InputLabelProps={{ style: { color: "#bbb" } }}
              sx={{ input: { color: "white" } }}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Giờ Hoạt Động"
              value={form.openingHours}
              onChange={(e) => handleChange("openingHours", e.target.value)}
              InputLabelProps={{ style: { color: "#bbb" } }}
              sx={{ input: { color: "white" } }}
            />
          </Grid>

          {/* SELECT TRẠNG THÁI */}
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Trạng Thái"
              select
              value={form.status}
              onChange={(e) => handleChange("status", e.target.value)}
              InputLabelProps={{ style: { color: "#bbb" } }}
              sx={{ 
                input: { color: "white" },
                ".MuiSelect-select": { color: "white" },
              }}
            >
              <MenuItem value="active">Hoạt động</MenuItem>
              <MenuItem value="inactive">Tạm đóng</MenuItem>
            </TextField>
          </Grid>

          {/* URL IMAGE */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="URL Hình Ảnh"
              value={form.image}
              onChange={(e) => handleChange("image", e.target.value)}
              InputLabelProps={{ style: { color: "#bbb" } }}
              sx={{ input: { color: "white" } }}
            />
          </Grid>
        </Grid>

        {/* NÚT */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
          <Button onClick={onClose} sx={{ mr: 2 }}>
            Hủy
          </Button>
          <Button variant="contained" onClick={() => onSave(form)}>
            Cập Nhật
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import { useState } from "react";

interface AddCinemaModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (data: any) => void;
}

export const AddCinemaModal = ({ open, onClose, onCreate }: AddCinemaModalProps) => {
  const [form, setForm] = useState({
    name: "",
    city: "",
    image: "",
    description: "",
    address: "",
    phone: "",
    email: "",
    rooms: 0,
    seats: 0,
    openingHours: "",
  });

  const handleChange = (key: string, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Thêm Rạp Mới</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Tên rạp"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Thành phố"
              value={form.city}
              onChange={(e) => handleChange("city", e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="URL Hình ảnh"
              value={form.image}
              onChange={(e) => handleChange("image", e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Mô tả"
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Địa chỉ"
              value={form.address}
              onChange={(e) => handleChange("address", e.target.value)}
            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Số điện thoại"
              value={form.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Email"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              type="number"
              label="Phòng chiếu"
              value={form.rooms}
              onChange={(e) => handleChange("rooms", Number(e.target.value))}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              type="number"
              label="Tổng số ghế"
              value={form.seats}
              onChange={(e) => handleChange("seats", Number(e.target.value))}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Giờ hoạt động"
              placeholder="8:00 - 22:00"
              value={form.openingHours}
              onChange={(e) => handleChange("openingHours", e.target.value)}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Hủy</Button>

        <Button variant="contained" onClick={() => onCreate(form)}>
          Tạo rạp
        </Button>
      </DialogActions>
    </Dialog>
  );
};

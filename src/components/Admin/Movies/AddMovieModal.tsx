import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
} from "@mui/material";
import { useState } from "react";

interface AddMovieModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (data: any) => void;
}

export const AddMovieModal = ({
  open,
  onClose,
  onCreate,
}: AddMovieModalProps) => {
  const [form, setForm] = useState({
    title: "",
    category: "",
    duration: 120,
    image: "",
  });

  const update = (k: string, v: any) =>
    setForm((prev) => ({ ...prev, [k]: v }));

  const handleSubmit = () => {
    onCreate(form);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Thêm Phim Mới</DialogTitle>

      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <TextField
              label="Tên phim"
              fullWidth
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              label="Thể loại"
              fullWidth
              value={form.category}
              onChange={(e) => update("category", e.target.value)}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              label="Thời lượng (phút)"
              type="number"
              fullWidth
              value={form.duration}
              onChange={(e) => update("duration", Number(e.target.value))}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              label="Link hình ảnh"
              fullWidth
              value={form.image}
              onChange={(e) => update("image", e.target.value)}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Hủy</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Thêm Phim
        </Button>
      </DialogActions>
    </Dialog>
  );
};

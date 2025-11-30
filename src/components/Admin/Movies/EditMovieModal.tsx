import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import { useState, useEffect } from "react";

// ----------------------
// 1. Tạo interface Movie
// ----------------------
export interface Movie {
  id: string;
  title: string;
  category: string;
  duration: number;
  director?: string;
  actors?: string;
  image: string;
}

interface EditMovieModalProps {
  open: boolean;
  onClose: () => void;
  movie: Movie | null;
  onSave: (data: Movie) => void;
}

export const EditMovieModal = ({
  open,
  onClose,
  movie,
  onSave,
}: EditMovieModalProps) => {
  
  // ----------------------
  // 2. Khởi tạo state có kiểu Movie
  // ----------------------
  const [form, setForm] = useState<Movie>(
    movie || {
      id: "",
      title: "",
      category: "",
      duration: 0,
      director: "",
      actors: "",
      image: "",
    }
  );

  // ----------------------
  // 3. Khi movie thay đổi → update form
  // ----------------------
  useEffect(() => {
    if (movie) setForm(movie);
  }, [movie]);

  if (!movie) return null;

  // ----------------------
  // 4. Hàm update có kiểu đầy đủ
  // ----------------------
  const update = (key: keyof Movie, value: any) => {
    setForm((prev: Movie) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      
      <DialogTitle>Chỉnh Sửa Phim</DialogTitle>

      <DialogContent dividers>
        <Grid container spacing={2}>
          
          <Grid item xs={12}>
            <TextField
              label="Tên phim"
              fullWidth
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Thể loại"
              fullWidth
              value={form.category}
              onChange={(e) => update("category", e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Thời lượng (phút)"
              type="number"
              fullWidth
              value={form.duration}
              onChange={(e) => update("duration", Number(e.target.value))}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Đạo diễn"
              fullWidth
              value={form.director || ""}
              onChange={(e) => update("director", e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Diễn viên"
              fullWidth
              value={form.actors || ""}
              onChange={(e) => update("actors", e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Link ảnh"
              fullWidth
              value={form.image}
              onChange={(e) => update("image", e.target.value)}
            />
          </Grid>

        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Hủy</Button>

        <Button
          variant="contained"
          onClick={() => {
            onSave(form);
            onClose();
          }}
        >
          Lưu
        </Button>
      </DialogActions>

    </Dialog>
  );
};

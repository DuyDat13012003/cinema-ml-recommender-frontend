// src/components/Admin/Promotions/PromotionModal.tsx
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  MenuItem,
  Typography,
  Switch,
} from "@mui/material";
import { useState } from "react";
import { Promotion } from "../../../hooks/admin/usePromotions";
import dayjs from "dayjs";

interface Props {
  open: boolean;
  onClose: () => void;
  initialData?: Promotion | null;
  onSave: (data: Promotion) => void;
}

export const PromotionModal = ({ open, onClose, initialData, onSave }: Props) => {

  const isEditing = Boolean(initialData);

  const [form, setForm] = useState<Promotion>(
    initialData ?? {
      id: crypto.randomUUID(),
      title: "",
      description: "",
      image: "",
      category: "discount",
      discountPercent: undefined,
      startDate: dayjs().format("YYYY-MM-DD"),
      endDate: dayjs().add(7, "day").format("YYYY-MM-DD"),
      active: true,
    }
  );

  const handleChange = (field: keyof Promotion, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onSave(form);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          background: "#0f172a",
          color: "#fff",
          borderRadius: 3,
        },
      }}
    >
      <DialogTitle sx={{ fontWeight: 700 }}>
        {isEditing ? "✏️ Chỉnh sửa khuyến mãi" : "🆕 Tạo khuyến mãi mới"}
      </DialogTitle>

      <DialogContent>
        <Box sx={{ display: "grid", gap: 2, mt: 1 }}>

          {/* Upload image */}
          <Box>
            <Typography sx={{ mb: 1 }}>Hình ảnh</Typography>

            {form.image ? (
              <Box
                sx={{
                  width: "100%",
                  height: 200,
                  backgroundImage: `url(${form.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: 2,
                  mb: 1,
                }}
              />
            ) : (
              <Box
                sx={{
                  width: "100%",
                  height: 200,
                  background: "#1e293b",
                  borderRadius: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#666",
                }}
              >
                Chưa có ảnh
              </Box>
            )}

            <Button
              variant="outlined"
              component="label"
              sx={{
                borderColor: "#3b82f6",
                color: "#3b82f6",
                textTransform: "none",
              }}
            >
              Chọn ảnh
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const url = URL.createObjectURL(file);
                  handleChange("image", url);
                }}
              />
            </Button>
          </Box>

          {/* Title */}
          <TextField
            label="Tiêu đề"
            value={form.title}
            onChange={(e) => handleChange("title", e.target.value)}
            InputLabelProps={{ sx: { color: "#aaa" } }}
            InputProps={{ sx: { color: "#fff" } }}
            fullWidth
          />

          {/* Description */}
          <TextField
            label="Mô tả"
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
            multiline
            minRows={4}
            InputLabelProps={{ sx: { color: "#aaa" } }}
            InputProps={{ sx: { color: "#fff" } }}
            fullWidth
          />

          {/* Category */}
          <TextField
            select
            label="Loại khuyến mãi"
            value={form.category}
            onChange={(e) => handleChange("category", e.target.value)}
            InputLabelProps={{ sx: { color: "#aaa" } }}
            InputProps={{ sx: { color: "#fff" } }}
            fullWidth
          >
            <MenuItem value="discount">Giảm giá</MenuItem>
            <MenuItem value="combo">Combo ưu đãi</MenuItem>
            <MenuItem value="flash">Flash sale</MenuItem>
            <MenuItem value="member">Ưu đãi thành viên</MenuItem>
          </TextField>

          {/* Discount percent – only shows if category = discount or flash */}
          {(form.category === "discount" || form.category === "flash") && (
            <TextField
              label="Phần trăm giảm"
              type="number"
              value={form.discountPercent ?? ""}
              onChange={(e) =>
                handleChange("discountPercent", Number(e.target.value))
              }
              InputLabelProps={{ sx: { color: "#aaa" } }}
              InputProps={{ sx: { color: "#fff" } }}
              fullWidth
            />
          )}

          {/* Date range */}
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              label="Ngày bắt đầu"
              type="date"
              value={form.startDate}
              onChange={(e) => handleChange("startDate", e.target.value)}
              InputLabelProps={{
                shrink: true,
                sx: { color: "#aaa" },
              }}
              InputProps={{ sx: { color: "#fff" } }}
              fullWidth
            />

            <TextField
              label="Ngày kết thúc"
              type="date"
              value={form.endDate}
              onChange={(e) => handleChange("endDate", e.target.value)}
              InputLabelProps={{
                shrink: true,
                sx: { color: "#aaa" },
              }}
              InputProps={{ sx: { color: "#fff" } }}
              fullWidth
            />
          </Box>

          {/* Active switch */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography>Kích hoạt:</Typography>
            <Switch
              checked={form.active}
              onChange={(e) => handleChange("active", e.target.checked)}
            />
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} sx={{ color: "#aaa", textTransform: "none" }}>
          Hủy
        </Button>

        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{
            backgroundColor: "#3b82f6",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#2563eb",
            },
          }}
        >
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  );
};

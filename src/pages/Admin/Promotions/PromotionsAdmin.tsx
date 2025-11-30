// src/pages/Admin/Promotions/PromotionsAdmin.tsx

import {
  Box,
  Typography,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import { useState, useMemo } from "react";

import { Promotion } from "../../../hooks/admin/usePromotions";
import { usePromotions } from "../../../hooks/admin/usePromotions";

import { PromotionCard } from "../../../components/Admin/Promotions/PromotionCard";
import { PromotionModal } from "../../../components/Admin/Promotions/PromotionModal";
import { PromotionFilterBar } from "../../../components/Admin/Promotions/PromotionFilterBar";

import dayjs from "dayjs";

export const PromotionsAdmin = () => {
  const { data: promotions } = usePromotions();

  const [filter, setFilter] = useState("all");
  const [openModal, setOpenModal] = useState(false);
  const [editingPromo, setEditingPromo] = useState<Promotion | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Promotion | null>(null);

  // ============================
  // FILTER LOGIC
  // ============================
  const filteredPromotions = useMemo(() => {
    const now = dayjs();

    return promotions.filter((p) => {
      const start = dayjs(p.startDate);
      const end = dayjs(p.endDate);

      if (filter === "active") return now.isAfter(start) && now.isBefore(end);
      if (filter === "upcoming") return now.isBefore(start);
      if (filter === "expired") return now.isAfter(end);
      if (filter === "flash") return p.category === "flash";
      return true;
    });
  }, [promotions, filter]);

  // ============================
  // CRUD LOGIC
  // ============================
  const handleSave = (data: Promotion) => {
    if (editingPromo) {
      // Edit mode
      const index = promotions.findIndex((p) => p.id === editingPromo.id);
      promotions[index] = data;
    } else {
      // Create mode
      promotions.push(data);
    }
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    const index = promotions.findIndex((p) => p.id === deleteTarget.id);
    promotions.splice(index, 1);
    setDeleteTarget(null);
  };

  return (
    <Box sx={{ p: 3, color: "white" }}>
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4" fontWeight={800}>
          🎁 Tin tức & Khuyến mãi
        </Typography>

        <Button
          variant="contained"
          onClick={() => {
            setEditingPromo(null);
            setOpenModal(true);
          }}
          sx={{
            backgroundColor: "#3b82f6",
            textTransform: "none",
            fontWeight: 600,
            "&:hover": { backgroundColor: "#2563eb" },
          }}
        >
          + Tạo khuyến mãi
        </Button>
      </Box>

      {/* Filter bar */}
      <PromotionFilterBar tab={filter} onChange={setFilter} />

      {/* Promotion Grid */}
      <Grid container spacing={3}>
        {filteredPromotions.length === 0 ? (
          <Box
            sx={{ color: "#888", mt: 5, textAlign: "center", width: "100%" }}
          >
            Không có khuyến mãi nào.
          </Box>
        ) : (
          filteredPromotions.map((p) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={p.id}>
              <PromotionCard
                item={p}
                onEdit={(promo) => {
                  setEditingPromo(promo);
                  setOpenModal(true);
                }}
                onDelete={(id) => {
                  const target = promotions.find((x) => x.id === id);
                  if (target) setDeleteTarget(target);
                }}
              />
            </Grid>
          ))
        )}
      </Grid>

      {/* Modal Create/Edit */}
      {openModal && (
        <PromotionModal
          open={openModal}
          initialData={editingPromo}
          onClose={() => {
            setOpenModal(false);
            setEditingPromo(null);
          }}
          onSave={handleSave}
        />
      )}

      {/* Delete Confirm Dialog */}
      <Dialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        PaperProps={{
          sx: {
            background: "#0f172a",
            color: "white",
            borderRadius: 3,
          },
        }}
      >
        <DialogTitle>Bạn có chắc muốn xóa khuyến mãi này?</DialogTitle>
        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={() => setDeleteTarget(null)}
            sx={{ color: "#aaa", textTransform: "none" }}
          >
            Hủy
          </Button>

          <Button
            color="error"
            onClick={handleDelete}
            sx={{ textTransform: "none" }}
          >
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

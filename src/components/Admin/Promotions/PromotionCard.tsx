// src/components/Admin/Promotions/PromotionCard.tsx
import {
  Box,
  Card,
  CardMedia,
  Typography,
  Chip,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import { Promotion } from "../../../hooks/admin/usePromotions";
import dayjs from "dayjs";

interface Props {
  item: Promotion;
  onEdit: (item: Promotion) => void;
  onDelete: (id: string) => void;
}

export const PromotionCard = ({ item, onEdit, onDelete }: Props) => {
  const [anchorMenu, setAnchorMenu] = useState<null | HTMLElement>(null);

  const openMenu = (e: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorMenu(e.currentTarget);
  const closeMenu = () => setAnchorMenu(null);

  const now = dayjs();
  const expired = now.isAfter(dayjs(item.endDate));

  const categoryColor: Record<string, string> = {
    flash: "#ff4444",
    discount: "#0ea5e9",
    combo: "#22c55e",
    member: "#a855f7",
  };

  return (
    <Card
      sx={{
        bgcolor: "#141414",
        borderRadius: 3,
        overflow: "hidden",
        position: "relative",
        cursor: "pointer",
        transition: "0.3s",
        border: "1px solid rgba(255,255,255,0.05)",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 8px 30px rgba(0,0,0,0.6)",
        },
      }}
    >
      {/* Ảnh */}
      <CardMedia
        component="div"
        sx={{
          height: 220,
          backgroundImage: `url(${item.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        {/* Overlay */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.8))",
          }}
        />

        {/* Category badge */}
        <Chip
          label={item.category.toUpperCase()}
          sx={{
            position: "absolute",
            top: 12,
            left: 12,
            bgcolor: categoryColor[item.category],
            color: "#fff",
            fontWeight: 700,
          }}
        />

        {/* Menu */}
        <IconButton
          sx={{ position: "absolute", top: 8, right: 8, color: "#fff" }}
          onClick={openMenu}
        >
          <MoreVertIcon />
        </IconButton>

        <Menu anchorEl={anchorMenu} open={Boolean(anchorMenu)} onClose={closeMenu}>
          <MenuItem
            onClick={() => {
              closeMenu();
              onEdit(item);
            }}
          >
            Chỉnh sửa
          </MenuItem>

          <MenuItem
            onClick={() => {
              closeMenu();
              onDelete(item.id);
            }}
            sx={{ color: "red" }}
          >
            Xóa
          </MenuItem>
        </Menu>
      </CardMedia>

      {/* Info */}
      <Box sx={{ p: 2 }}>
        <Typography
          sx={{
            fontSize: "1.1rem",
            fontWeight: 600,
            color: "#fff",
            mb: 1,
          }}
        >
          {item.title}
        </Typography>

        <Typography sx={{ fontSize: 14, color: "#aaa", mb: 1 }}>
          {item.description}
        </Typography>

        <Typography
          sx={{
            fontSize: 13,
            color: expired ? "#ff4444" : "#32cd32",
            fontWeight: 600,
          }}
        >
          {expired
            ? "ĐÃ HẾT HẠN"
            : `Hiệu lực: ${item.startDate} → ${item.endDate}`}
        </Typography>
      </Box>
    </Card>
  );
};

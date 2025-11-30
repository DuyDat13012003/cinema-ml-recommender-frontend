// src/components/Admin/Auditoriums/AdminSeatEditor.tsx

import { Box, Button, Menu, MenuItem, Tooltip } from "@mui/material";
import { Seat } from "../../../hooks/admin/useAuditoriumManager";
import { useState } from "react";

interface Props {
  seats: Seat[];
  mode: "view" | "edit";
  rows: string[];
  columns: number;
  onChangeSeat: (seat: Seat) => void;
  onResize: (newRows: string[], newColumns: number) => void;
}

export const AdminSeatEditor = ({
  seats,
  mode,
  rows,
  columns,
  onChangeSeat,
  onResize,
}: Props) => {
  const grouped = seats.reduce((acc: Record<string, Seat[]>, seat) => {
    if (!acc[seat.row]) acc[seat.row] = [];
    acc[seat.row].push(seat);
    return acc;
  }, {});

  /* ============================================
      MENU POPUP CHỌN LOẠI GHẾ
     ============================================ */
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);

  const open = Boolean(anchorEl);

    const handleOpenMenu = (event: React.MouseEvent<HTMLDivElement>, seat: Seat) => {
    if (mode !== "edit") return;

    setAnchorEl(event.currentTarget as HTMLElement);
    setSelectedSeat(seat);
    };


  const handleSelectType = (type: Seat["type"]) => {
    if (!selectedSeat) return;

    const updated: Seat = { ...selectedSeat, type };

    onChangeSeat(updated);
    setAnchorEl(null);
  };

  /* ============================================
      RENDER GHẾ
     ============================================ */

  const renderSeatColor = (type: string) => {
    switch (type) {
      case "vip":
        return "#f7b500";
      case "couple":
        return "#ff3b81";
      case "sweetbox":
        return "#9d4edd";
      case "disabled":
        return "#555";
      default:
        return "#444";
    }
  };

  /* ============================================
      TẠO UI RESIZE LAYOUT
     ============================================ */

  const addRow = () => {
    const newRow = String.fromCharCode(rows.length + 65); // từ A,B,C → D,E,F...
    onResize([...rows, newRow], columns);
  };

  const addColumn = () => {
    onResize(rows, columns + 1);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {/* ====== BUTTON RESIZE ====== */}
      {mode === "edit" && (
        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <Button variant="outlined" onClick={addRow}>
            + Thêm Hàng
          </Button>
          <Button variant="outlined" onClick={addColumn}>
            + Thêm Cột
          </Button>
        </Box>
      )}

      {/* ====== SEAT MAP RENDER ====== */}
      {Object.entries(grouped).map(([row, rowSeats]) => (
        <Box
          key={row}
          sx={{
            display: "flex",
            gap: 0.6,
            alignItems: "center",
          }}
        >
          <Box sx={{ width: 20, textAlign: "right", color: "#bbb" }}>
            {row}
          </Box>

          {rowSeats.map((seat) => (
            <Tooltip
              key={seat.id}
              title={`Ghế ${seat.row}${seat.number} - ${seat.type}`}
            >
              <Box
                onClick={(e) => handleOpenMenu(e, seat)}
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: 1,
                  cursor: mode === "edit" ? "pointer" : "default",
                  background: renderSeatColor(seat.type),
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: 11,
                  color: "white",
                  fontWeight: 600,
                  border: "1px solid #222",
                }}
              >
                {seat.column}
              </Box>
            </Tooltip>
          ))}

          <Box sx={{ width: 20, color: "#bbb" }}>{row}</Box>
        </Box>
      ))}

      {/* ====== MENU CHỌN LOẠI GHẾ ====== */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={() => handleSelectType("regular")}>
          Ghế Thường
        </MenuItem>
        <MenuItem onClick={() => handleSelectType("vip")}>
          Ghế VIP
        </MenuItem>
        <MenuItem onClick={() => handleSelectType("couple")}>
          Ghế Đôi
        </MenuItem>
        <MenuItem onClick={() => handleSelectType("sweetbox")}>
          Sweetbox
        </MenuItem>
        <MenuItem onClick={() => handleSelectType("disabled")}>
          Ghế Khóa
        </MenuItem>
      </Menu>
    </Box>
  );
};

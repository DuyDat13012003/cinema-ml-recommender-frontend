// src/pages/Admin/Auditoriums/AuditoriumDetail.tsx
import { Box, Button, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useState } from "react";

import { AdminSeatEditor } from "../../../components/Admin/Auditoriums/AdminSeatEditor";
import { useAuditoriumManager } from "../../../hooks/admin/useAuditoriumManager";
import { Seat } from "../../../hooks/admin/useAuditoriumManager";

export const AuditoriumDetail = () => {
  const { id } = useParams(); // id của phòng chiếu
  const { getLayout, updateLayout } = useAuditoriumManager();

  const auditorium = getLayout(id || "");
  const [mode, setMode] = useState<"view" | "edit">("view");

  if (!auditorium) {
    return (
      <Typography sx={{ color: "white", p: 3 }}>
        Không tìm thấy phòng chiếu.
      </Typography>
    );
  }

  const handleSave = () => {
    updateLayout(auditorium.id, auditorium.seats);
    setMode("view");
    alert("Đã lưu thay đổi!");
  };

  const handleSeatChange = (updatedSeat: any) => {
    // cập nhật trực tiếp seat vào layout
    const newSeats = auditorium.seats.map((s) =>
      s.id === updatedSeat.id ? updatedSeat : s
    );
    updateLayout(auditorium.id, newSeats);
  };

  const handleResize = (newRows: string[], newColumns: number) => {
    const newSeats: Seat[] = [];

    newRows.forEach((row) => {
      for (let col = 1; col <= newColumns; col++) {
        const id = `${row}${col}`;
        const existing = auditorium.seats.find((s) => s.id === id);

        if (existing) newSeats.push(existing);
        else {
          newSeats.push({
            id,
            row,
            number: col,
            column: col,
            type: "regular",
            isAvailable: true,
            basePrice: 90000,
            extraPrice: 0,
          });
        }
      }
    });

    updateLayout(auditorium.id, newSeats);
  };

  return (
    <Box sx={{ p: 3, color: "white" }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Sơ Đồ Ghế – {auditorium.name}
      </Typography>

      {/* Nút toggle View/Edit */}
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <Button
          variant="contained"
          onClick={() => setMode(mode === "view" ? "edit" : "view")}
        >
          {mode === "view" ? "Chỉnh Sửa Sơ Đồ" : "Chế Độ Xem"}
        </Button>

        {mode === "edit" && (
          <Button variant="contained" color="success" onClick={handleSave}>
            Lưu Thay Đổi
          </Button>
        )}
      </Box>

      {/* Editor */}
      <AdminSeatEditor
        seats={auditorium.seats}
        rows={auditorium.rows}
        columns={auditorium.columns}
        mode={mode}
        onChangeSeat={handleSeatChange}
        onResize={handleResize}
      />
    </Box>
  );
};

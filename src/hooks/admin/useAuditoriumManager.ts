// src/hooks/admin/useAuditoriumManager.ts
import { useState } from "react";

/* ======================================================
   TYPE GHẾ DÙNG CHUNG CHO BOOKING + ADMIN
   ====================================================== */

export interface Seat {
  id: string;
  row: string;
  number: number;
  column: number;
  type: "regular" | "vip" | "couple" | "sweetbox" | "disabled";

  status: "available" | "booked" | "pending";  // ⬅️ thay cho isAvailable

  basePrice: number;
  extraPrice: number;

  pairId?: string;   // ⬅️ thêm để ghế đôi hoạt động
}


/* ------ Cấu trúc Layout Phòng ------- */
export interface AuditoriumLayout {
  id: string;
  name: string;
  rows: string[];
  columns: number;
  seats: Seat[];
}

/* ======================================================
   HÀM TẠO PHÒNG — thêm ghế đôi RẤT CHUẨN
   ====================================================== */

const buildLayout = (
  auditoriumId: string,
  name: string,
  rowLabels: string[],
  cols: number
): AuditoriumLayout => {
  const seats: Seat[] = [];

  rowLabels.forEach((row) => {
    for (let col = 1; col <= cols; col++) {
      const isVip = col <= 2;
      const isCouple = col === cols;

      seats.push({
        id: `${row}${col}`,
        row,
        number: col,
        column: col,

        type: isCouple ? "couple" : isVip ? "vip" : "regular",

        status: "available",

        basePrice: 90000,
        extraPrice: isVip ? 20000 : 0,

        pairId: isCouple ? `${row}_couple_group` : undefined,
      });
    }
  });

  return {
    id: auditoriumId,
    name,
    rows: rowLabels,
    columns: cols,
    seats,
  };
};


/* ======================================================
   MOCK PHÒNG CHIẾU
   ====================================================== */

const mockLayouts: AuditoriumLayout[] = [
  buildLayout("A1", "Phòng 1", ["A", "B", "C", "D"], 12),
  buildLayout("A2", "Phòng 2", ["A", "B", "C"], 10),
  buildLayout("B1", "Phòng 3", ["A", "B", "C", "D", "E"], 8),
];

/* ======================================================
   HOOK QUẢN LÝ PHÒNG — CHUẨN HOÁ
   ====================================================== */

export const useAuditoriumManager = () => {
  const [auditoriums, setAuditoriums] = useState<AuditoriumLayout[]>(mockLayouts);

  const getLayout = (id: string) =>
    auditoriums.find((a) => a.id === id);

  const updateSeat = (auditoriumId: string, seat: Seat) => {
    setAuditoriums(prev =>
      prev.map(a =>
        a.id === auditoriumId
          ? { ...a, seats: a.seats.map(s => (s.id === seat.id ? seat : s)) }
          : a
      )
    );
  };

  const updateLayout = (auditoriumId: string, seats: Seat[]) => {
    setAuditoriums(prev =>
      prev.map(a =>
        a.id === auditoriumId ? { ...a, seats } : a
      )
    );
  };

  return { auditoriums, getLayout, updateSeat, updateLayout };
};

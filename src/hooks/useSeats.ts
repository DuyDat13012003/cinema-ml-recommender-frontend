// src/hooks/useSeats.ts
import { useEffect, useState } from "react";
import { useAuditoriumManager, Seat as AuditoriumSeat } from "./admin/useAuditoriumManager";
import { getShowtimeDetail } from "./useShowtimes";

export interface BookingSeat {
  id: string;
  row: string;
  number: number;
  column: number;

  type: "regular" | "vip" | "couple" | "sweetbox" | "disabled";
  status: "available" | "booked" | "pending";

  basePrice: number;
  extraPrice: number;

  pairId?: string; // 👉 thêm để booking hiểu
}

export const useSeats = (showtimeId: string) => {
  const { getLayout } = useAuditoriumManager();

  const [data, setData] = useState<BookingSeat[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!showtimeId) {
      setData([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // 1️⃣ Lấy suất chiếu
      const showtime = getShowtimeDetail(showtimeId);
      if (!showtime) throw new Error("Không tìm thấy suất chiếu.");

      // 2️⃣ Lấy layout phòng
      const auditorium = getLayout(showtime.auditoriumId);
      if (!auditorium) throw new Error("Không tìm thấy phòng chiếu.");

      // 3️⃣ Ghế booked/pending (mock)
      const bookedSeats = ["A2", "B4"];
      const pendingSeats = ["C3"];

      // 4️⃣ Generate seat list cho Booking
      const seatList: BookingSeat[] = auditorium.seats.map((s: AuditoriumSeat) => {
        // 👉 Tạo pairId tự động cho ghế đôi
        let pairId: string | undefined = undefined;

        if (s.type === "couple") {
          const groupIndex = Math.ceil(s.number / 2);
          pairId = `${s.row}-${groupIndex}`; // C-4, E-6, ...
        }

        return {
          id: s.id,
          row: s.row,
          number: s.number,
          column: s.column,

          type: s.type,
          basePrice: s.basePrice,
          extraPrice: s.extraPrice,

          status: bookedSeats.includes(s.id)
            ? "booked"
            : pendingSeats.includes(s.id)
            ? "pending"
            : "available",

          pairId, // 👉 thêm vào ghế đôi
        };
      });

      setData(seatList);
    } catch (err: any) {
      setError(err.message || "Lỗi tải ghế");
    }

    setIsLoading(false);
  }, [showtimeId]);

  return { data, isLoading, error };
};

  // ======================= useShowtimes.ts =======================
  import { useEffect, useState } from "react";
  import { format, addDays } from "date-fns";

  /* ============================================================
    INTERFACE SUẤT CHIẾU
    ============================================================ */
  export interface Showtime {
    id: string;

    movieId: string;
    cinemaId: string;
    auditoriumId: string;

    date: string;   // yyyy-MM-dd
    time: string;

    format: "2D" | "3D" | "IMAX" | "4DX";
    language: "Vietsub" | "Thuyết minh" | "Eng";

    basePrice: number;
    weekendPrice: number;

    isHot: boolean;
    isEarlyBird: boolean;

    totalSeats: number;
    availableSeats: number;

    seatMapId: string;   // 🔥 phải trùng auditoriumId (Admin)
  }

  /* ============================================================
    TẠO 7 NGÀY LIÊN TỤC
    ============================================================ */
  const today = new Date();
  const next7Days = Array.from({ length: 7 }).map((_, i) =>
    format(addDays(today, i), "yyyy-MM-dd")
  );

  /* ============================================================
    MOCK CHUẨN HOÁ HOÀN TOÀN
    3 RẠP → MỖI RẠP 1 PHÒNG CHÍNH
    ============================================================ */

  const buildShowtimes = (
    baseId: string,
    movieId: string,
    cinemaId: string,
    auditoriumId: string,
    time: string
  ): Showtime[] => {
    return next7Days.map((date, idx) => ({
      id: `${baseId}_d${idx}`,     // ID đảm bảo click được
      movieId,
      cinemaId,
      auditoriumId,
      date,
      time,
      format: "2D",
      language: "Vietsub",
      basePrice: 90000,
      weekendPrice: 120000,
      isHot: false,
      isEarlyBird: false,
      totalSeats: 120,
      availableSeats: 50,
      seatMapId: auditoriumId,      // 🔥 cực kỳ quan trọng
    }));
  };

  const showtimesMock: Showtime[] = [
    ...buildShowtimes("stA1", "m1", "cinema1", "A1", "10:00"),
    ...buildShowtimes("stA2", "m1", "cinema2", "A2", "14:30"),
    ...buildShowtimes("stB1", "m2", "cinema3", "B1", "18:00"),
  ];

  /* ============================================================
    API-LIKE
    ============================================================ */
  export const getShowtimeDetail = (id: string) =>
    showtimesMock.find((s) => s.id === id) || null;

  /* ============================================================
    HOOK CHO BOOKING
    ============================================================ */
  export const useShowtimes = (cinemaId?: string, date?: string) => {
    const [data, setData] = useState<Showtime[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
      if (!cinemaId || !date) {
        setData([]);
        return;
      }

      setIsLoading(true);

      const result = showtimesMock.filter(
        (s) => s.cinemaId === cinemaId && s.date === date
      );

      setData(result);
      setIsLoading(false);
    }, [cinemaId, date]);

    return { data, isLoading };
  };

  /* ============================================================
    API CHO ADMIN
    ============================================================ */
  export const getShowtimesByMovie = (movieId: string) =>
    showtimesMock.filter((s) => s.movieId === movieId);

  export const getShowtimesByCinema = (cinemaId: string) =>
    showtimesMock.filter((s) => s.cinemaId === cinemaId);

  export const getShowtimesByDate = (date: string) =>
    showtimesMock.filter((s) => s.date === date);

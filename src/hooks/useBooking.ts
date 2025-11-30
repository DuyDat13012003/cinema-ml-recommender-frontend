// src/hooks/useBooking.ts
import { useState, useEffect } from "react";
import { useShowtimes } from "./useShowtimes";
import { useSeats, BookingSeat } from "./useSeats";
import { useCinemas } from "./useCinemas";

/* ======================================================
   🔹 MAIN HOOK BOOKING
   ====================================================== */

export const useBooking = () => {
  const { data: cinemas } = useCinemas();

  const [selectedCinema, setSelectedCinema] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedShowtime, setSelectedShowtime] = useState<string | null>(null);

  // NEW: seats được load từ useSeats(showtimeId)
  const { data: seats } = useSeats(selectedShowtime || "");

  const [selectedSeats, setSelectedSeats] = useState<BookingSeat[]>([]);

  /* ======================================================
     🔹 HANDLE SEAT SELECT
     ====================================================== */
  const toggleSeat = (seat: BookingSeat) => {
    if (seat.status !== "available") return;

    setSelectedSeats((prev) => {
      const exists = prev.find((s) => s.id === seat.id);

      if (exists)
        return prev.filter((s) => s.id !== seat.id);

      return [...prev, seat];
    });
  };

  const removeSeat = (seatId: string) => {
    setSelectedSeats((prev) => prev.filter((s) => s.id !== seatId));
  };

  /* ======================================================
     🔹 PRICE CALCULATION (GIỮ NGUYÊN)
     ====================================================== */

  const subtotal = selectedSeats.reduce(
    (sum, seat) => sum + seat.basePrice + seat.extraPrice,
    0
  );

  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  /* ======================================================
     🔹 CLEAR BOOKING (GIỮ NGUYÊN)
     ====================================================== */

  const clearBooking = () => {
    setSelectedCinema(null);
    setSelectedDate(null);
    setSelectedShowtime(null);
    setSelectedSeats([]);
  };

  /* ======================================================
     🔹 FAKE PAYMENT API (GIỮ NGUYÊN)
     ====================================================== */

  const handlePayment = async () => {
    await new Promise((res) => setTimeout(res, 800));
    return {
      success: true,
      seats: selectedSeats.map((s) => s.id),
      total,
    };
  };

  return {
    cinemas,

    selectedCinema,
    setSelectedCinema,

    selectedDate,
    setSelectedDate,

    selectedShowtime,
    setSelectedShowtime,

    seats,             // ⭐ seats từ phòng chiếu (Admin)
    selectedSeats,
    toggleSeat,
    removeSeat,

    subtotal,
    tax,
    total,

    clearBooking,
    handlePayment,
  };
};

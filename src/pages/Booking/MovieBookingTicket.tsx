// src/pages/Booking/MovieBookingTicket.tsx
import { Box, Typography, CircularProgress, Fade } from "@mui/material";
import { useParams } from "react-router-dom";
import { useState, useMemo } from "react";

import { useShowtimes } from "../../hooks/useShowtimes";
import { useSeats, BookingSeat } from "../../hooks/useSeats";
import { useCinemas } from "../../hooks/useCinemas";

import { CinemaSelection } from "../../components/Common/Booking/CinemaSelection";
import { DateSelection } from "../../components/Common/Booking/DateSelection";
import { ShowtimeSelection } from "../../components/Common/Booking/ShowtimeSelection";
import { SeatSelection } from "../../components/Common/Booking/SeatSelection";
import { PaymentSummary } from "../../components/Common/Booking/PaymentSummary";

export const MovieBookingTicket = () => {
  const { id: movieId } = useParams();

  // ======== STATE ========
  const [selectedCinema, setSelectedCinema] = useState<string>();
  const [selectedDate, setSelectedDate] = useState<string>();
  const [selectedShowtime, setSelectedShowtime] = useState<string>();
  const [selectedSeats, setSelectedSeats] = useState<BookingSeat[]>([]);

  // ======== LOAD CINEMAS ========
  const {
    data: cinemas,
    isLoading: loadingCinemas,
    error: errorCinemas,
  } = useCinemas();

  // ======== LOAD SHOWTIMES THEO RẠP + NGÀY ========
  const { data: showtimes } = useShowtimes(selectedCinema, selectedDate);

  // ======== LOAD GHẾ THEO SUẤT ========
  const {
    data: seats,
    isLoading: loadingSeats,
  } = useSeats(selectedShowtime ?? "");

  // ======== RESET LOGIC ========
  const handleCinemaSelect = (cinemaId: string) => {
    setSelectedCinema(cinemaId);
    setSelectedDate(undefined);
    setSelectedShowtime(undefined);
    setSelectedSeats([]);
  };

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setSelectedShowtime(undefined);
    setSelectedSeats([]);
  };

  const handleShowtimeSelect = (showtimeId: string) => {
    setSelectedShowtime(showtimeId);
    setSelectedSeats([]);
  };

  // ======== SUMMARY ========
  const summary = useMemo(() => {
    if (
      !selectedCinema ||
      !selectedDate ||
      !selectedShowtime ||
      selectedSeats.length === 0
    )
      return null;

    const time =
      showtimes?.find((s) => s.id === selectedShowtime)?.time ?? "";

    const subtotal = selectedSeats.reduce(
      (sum, s) => sum + (s.basePrice + s.extraPrice),
      0
    );
    const tax = subtotal * 0.1;

    return {
      movieTitle: `Movie ID: ${movieId}`,
      cinemaName:
        cinemas?.find((c) => c.id === selectedCinema)?.name ?? "",
      date: selectedDate,
      time,
      seats: selectedSeats,
      subtotal,
      tax,
      total: subtotal + tax,
    };
  }, [
    selectedCinema,
    selectedDate,
    selectedShowtime,
    selectedSeats,
    showtimes,
    cinemas,
    movieId,
  ]);

  const handleConfirmBooking = () => {
    alert("🎉 Đặt vé thành công!");
  };

  // ======== LOADING ========
  if (loadingCinemas) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress sx={{ color: "#4299e1" }} />
      </Box>
    );
    ``;
  }

  if (errorCinemas) {
    return (
      <Typography sx={{ color: "red", mt: 4 }}>
        Không thể tải danh sách rạp. Xin thử lại.
      </Typography>
    );
  }

  // ======== UI ========
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ color: "#fff", fontWeight: 700, mb: 3 }}>
        🎟️ Đặt Vé Xem Phim
      </Typography>

      {/* Chọn rạp */}
      <CinemaSelection
        cinemas={cinemas ?? []}
        selectedCinemaId={selectedCinema}
        onSelectCinema={handleCinemaSelect}
      />

      {/* Chọn ngày */}
      {selectedCinema && (
        <Fade in timeout={300}>
          <Box>
            <DateSelection
              selectedDate={selectedDate}
              onSelectDate={handleDateSelect}
            />
          </Box>
        </Fade>
      )}

      {/* Chọn suất chiếu */}
      {selectedDate && (
        <Fade in timeout={300}>
          <Box sx={{ mt: 3 }}>
            <ShowtimeSelection
              showtimes={showtimes ?? []}
              selectedShowtimeId={selectedShowtime}
              onSelectShowtime={handleShowtimeSelect}
            />
          </Box>
        </Fade>
      )}

      {/* Chọn ghế */}
      {selectedShowtime && (
        <Fade in timeout={300}>
          <Box sx={{ mt: 3 }}>
            {loadingSeats ? (
              <CircularProgress sx={{ color: "#4299e1" }} />
            ) : (
              <SeatSelection
                seats={seats ?? []}
                onSelectSeats={setSelectedSeats}
              />
            )}
          </Box>
        </Fade>
      )}

      {/* Summary */}
      {summary && (
        <Fade in timeout={300}>
          <Box sx={{ mt: 4 }}>
            <PaymentSummary
              summary={summary}
              onConfirmBooking={handleConfirmBooking}
            />
          </Box>
        </Fade>
      )}
    </Box>
  );
};

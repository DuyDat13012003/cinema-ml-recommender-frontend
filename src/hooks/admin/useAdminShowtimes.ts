// src/hooks/admin/useAdminShowtimes.ts
import {
  Showtime,
  getShowtimesByMovie,
  getShowtimesByCinema,
  getShowtimesByDate,
} from "../useShowtimes";

export const useAdminShowtimes = () => {
  // Admin sẽ xem toàn bộ showtimes không filter
  const data: Showtime[] = [
    ...getShowtimesByMovie("m1"),
    ...getShowtimesByMovie("m2"),
    ...getShowtimesByCinema("c1"),
    ...getShowtimesByCinema("c2"),
    ...getShowtimesByDate("2025-03-01"),
    ...getShowtimesByDate("2025-03-02"),
  ];

  return {
    data,
    isLoading: false,
    error: null,
  };
};

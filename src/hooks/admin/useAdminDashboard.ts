// src/hooks/admin/useAdminDashboard.ts

export interface TodayStats {
  tickets: number;
  revenue: number;
  films: number;
  occupancy: number;
}

export interface BarChartItem {
  name: string;
  revenue: number;
}

export interface PieChartItem {
  name: string;
  value: number;
}

export interface UpcomingShow {
  film: string;
  time: string;
  booked: string;
}

export const useAdminDashboard = () => {
  // 1. KPI hôm nay
  const todayStats: TodayStats = {
    tickets: 1247,
    revenue: 142_500_000,
    films: 28,
    occupancy: 78,
  };

  // 2. Biểu đồ doanh thu
  const barData: BarChartItem[] = [
    { name: "T1", revenue: 250_000_000 },
    { name: "T2", revenue: 320_000_000 },
    { name: "T3", revenue: 410_000_000 },
    { name: "T4", revenue: 380_000_000 },
    { name: "T5", revenue: 450_000_000 },
    { name: "T6", revenue: 520_000_000 },
  ];

  // 3. Biểu đồ phân loại phim
  const pieData: PieChartItem[] = [
    { name: "Hành động", value: 35 },
    { name: "Tâm lý", value: 25 },
    { name: "Kinh dị", value: 20 },
    { name: "Hài", value: 15 },
    { name: "Khác", value: 5 },
  ];

  // 4. Suất chiếu sắp diễn ra
  const showtimes: UpcomingShow[] = [
    { film: "Godzilla x Kong: The New Empire", time: "14:30 - P1", booked: "152/180" },
    { film: "Dune: Part Two", time: "15:00 - P3", booked: "98/150" },
    { film: "Kung Fu Panda 4", time: "15:30 - P2", booked: "120/140" },
  ];

  return {
    todayStats,
    barData,
    pieData,
    showtimes,
    isLoading: false,
  };
};

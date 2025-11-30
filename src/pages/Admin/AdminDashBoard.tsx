// src/pages/Admin/AdminDashboard.tsx
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
} from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

import { useAdminDashboard } from "../../hooks/admin/useAdminDashboard";

export const AdminDashboard = () => {
  const { todayStats, barData, pieData, showtimes } = useAdminDashboard();

  const COLORS = ["#29b6f6", "#fdd835", "#66bb6a", "#9575cd", "#ef5350"];

  return (
    <Box sx={{ color: "white", width: "100%", maxWidth: "100%", px: 3 }}>
      {/* TITLE */}
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
        Tổng quan hệ thống
      </Typography>

      {/* KPI CARDS */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          <Card sx={{ background: "#151925" }}>
            <CardContent>
              <Typography sx={{ opacity: 0.7 }}>Vé bán hôm nay</Typography>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                {todayStats.tickets.toLocaleString()}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                <TrendingUpIcon sx={{ fontSize: 18, color: "#66bb6a" }} />
                <Typography sx={{ ml: 1, color: "#66bb6a" }}>+12.5%</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card sx={{ background: "#151925" }}>
            <CardContent>
              <Typography sx={{ opacity: 0.7 }}>Doanh thu hôm nay</Typography>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                {(todayStats.revenue / 1_000_000).toFixed(1)}M đ
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                <TrendingUpIcon sx={{ fontSize: 18, color: "#66bb6a" }} />
                <Typography sx={{ ml: 1, color: "#66bb6a" }}>+8.2%</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card sx={{ background: "#151925" }}>
            <CardContent>
              <Typography sx={{ opacity: 0.7 }}>Phim đang chiếu</Typography>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                {todayStats.films}
              </Typography>
              <Typography sx={{ mt: 1, color: "#42a5f5" }}>5 phim mới</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card sx={{ background: "#151925" }}>
            <CardContent>
              <Typography sx={{ opacity: 0.7 }}>Tỷ lệ lấp đầy</Typography>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                {todayStats.occupancy}%
              </Typography>
              <Typography sx={{ mt: 1, color: "#66bb6a" }}>+5.3%</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* BIỂU ĐỒ */}
      <Grid container spacing={3}>
        {/* BAR CHART */}
        <Grid item xs={12} md={8}>
          <Card sx={{ background: "#151925", p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Doanh Thu 6 Tháng Gần Nhất
            </Typography>

            <BarChart width={600} height={280} data={barData}>
              <XAxis dataKey="name" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip />
              <Bar dataKey="revenue" fill="#29b6f6" />
            </BarChart>
          </Card>
        </Grid>

        {/* PIE CHART */}
        <Grid item xs={12} md={4}>
          <Card sx={{ background: "#151925", p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Phân Loại Phim
            </Typography>

            <PieChart width={350} height={300}>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={90}
                dataKey="value"
                label
              >
                {pieData.map((_, idx) => (
                  <Cell key={idx} fill={COLORS[idx]} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </Card>
        </Grid>
      </Grid>

      {/* SHOWTIMES LIST */}
      <Card sx={{ background: "#151925", p: 3, mt: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Suất Chiếu Sắp Diễn Ra
        </Typography>

        {showtimes.map((item, i) => (
          <Box
            key={i}
            sx={{
              py: 2,
              px: 2,
              mb: 1,
              borderRadius: 2,
              background: "#1e2330",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography sx={{ fontWeight: 700 }}>{item.film}</Typography>
              <Typography sx={{ opacity: 0.7 }}>{item.time}</Typography>
            </Box>

            <Typography sx={{ opacity: 0.8 }}>{item.booked}</Typography>
          </Box>
        ))}
      </Card>
    </Box>
  );
};

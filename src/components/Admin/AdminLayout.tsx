// src/components/Admin/AdminLayout.tsx
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { AdminSidebar } from "./AdminSidebar";
import { AdminHeader } from "./AdminHeader";
import { useState } from "react";

export const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", background: "#0f0f1e" }}>
      
      {/* SIDEBAR */}
      <AdminSidebar open={sidebarOpen} />

      {/* MAIN WRAPPER */}
      <Box
        sx={{
          flexGrow: 1,
          ml: sidebarOpen ? "240px" : "64px",
          transition: "all 0.3s ease",
          width: "100%",          // ❤️ đảm bảo fill toàn bộ
          overflowX: "hidden",     // chống tràn ngang
        }}
      >
        <AdminHeader onToggleSidebar={toggleSidebar} />

        {/* CONTENT */}
        <Box
          sx={{
            mt: "70px",
            px: 4,
            width: "100%",
            maxWidth: "100%",    // ❤️ rất quan trọng — không giới hạn width
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

// src/components/Layout/Layout.tsx
import { Box } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "./Header";
import { Sidebar } from "./Sidebar";
import { Footer } from "./Footer";

export const Layout = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#0f0f1e" }}>

      {/* FIXED HEADER */}
      <Header />

      <Box sx={{ display: "flex" }}>
        
        {/* FIXED SIDEBAR */}
        <Sidebar />

        {/* MAIN CONTENT */}
        <Box
          sx={{
            flex: 1,
            ml: "240px",        // width sidebar
            mt: "64px",         // height header
            p: 2
          }}
        >
          <Outlet />
        </Box>

      </Box>

      {/* FOOTER */}
      <Footer />
    </Box>
  );
};

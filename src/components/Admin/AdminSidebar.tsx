// src/components/Admin/AdminSidebar.tsx 
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import TheaterComedyIcon from "@mui/icons-material/TheaterComedy";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import GroupIcon from "@mui/icons-material/Group";
import CampaignIcon from "@mui/icons-material/Campaign";
import SettingsIcon from "@mui/icons-material/Settings";
import EventSeatIcon from "@mui/icons-material/EventSeat";   // ⭐ NEW ICON

import { Link, useLocation } from "react-router-dom";

export const AdminSidebar = ({ open }: { open: boolean }) => {
  const location = useLocation();
  const current = location.pathname;

  const menu = [
    { label: "Tổng quan", icon: <DashboardIcon />, path: "/admin" },
    { label: "Quản lý rạp", icon: <TheaterComedyIcon />, path: "/admin/cinemas" },

    // ⭐ NEW — Quản lý phòng chiếu
    { label: "Quản lý phòng chiếu", icon: <EventSeatIcon />, path: "/admin/auditoriums" },

    { label: "Quản lý vé", icon: <ConfirmationNumberIcon />, path: "/admin/tickets" },
    { label: "Người dùng", icon: <GroupIcon />, path: "/admin/users" },
    { label: "Tin tức & Khuyến mãi", icon: <CampaignIcon />, path: "/admin/promotions" },
    { label: "Cài đặt", icon: <SettingsIcon />, path: "/admin/settings" },
  ];

  // ⭐ RULE ACTIVE CHUẨN
  const isActive = (path: string) => {
    if (path === "/admin") {
      return current === "/admin"; // chỉ sáng đúng trang admin
    }
    return current === path || current.startsWith(path + "/");
  };

  return (
    <Box
      sx={{
        width: open ? 240 : 64,
        transition: "width 0.25s ease",
        overflow: "hidden",
        background: "#0d1b2a",
        color: "white",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        zIndex: 1200,
        pt: "64px",
        borderRight: "1px solid #1a2038",
      }}
    >
      <List sx={{ px: 0 }}>
        {menu.map((item, index) => {
          const active = isActive(item.path);

          return (
            <ListItemButton
              key={index}
              component={Link}
              to={item.path}
              sx={{
                px: 2,
                py: 1.5,
                background: active ? "rgba(255,255,255,0.1)" : "transparent",
                "&:hover": { background: "rgba(255,255,255,0.15)" },
              }}
            >
              <ListItemIcon
                sx={{
                  color: active ? "#3b82f6" : "white",
                  minWidth: 40,
                }}
              >
                {item.icon}
              </ListItemIcon>

              {open && (
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontSize: "15px",
                    fontWeight: active ? 600 : 400,
                    color: active ? "#3b82f6" : "white",
                  }}
                />
              )}
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );
};

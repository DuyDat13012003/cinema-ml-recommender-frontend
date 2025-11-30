// src/components/Layout/Header.tsx

import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Avatar,
  Divider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  return (
    <AppBar
      position="fixed"
      sx={{
        background: "#0d0d0d",
        zIndex: 1200,
        left: "240px",
        width: "calc(100% - 240px)",
        borderBottom: "1px solid #222",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* LOGO */}
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            color: "white",
            textDecoration: "none",
            fontWeight: 700,
            "&:hover": { color: "#3b82f6" },
            transition: "0.2s",
          }}
        >
          🎞 Cinebooking
        </Typography>

        {/* NAV MENU */}
        <Box sx={{ display: "flex", gap: 4 }}>
          {[
            { label: "Lịch Chiếu", path: "/showtimes" },
            { label: "Rạp chiếu", path: "/cinemas" },
            { label: "Phim chiếu", path: "/phim-chieu" },
            { label: "Review phim", path: "/review-phim" },
          ].map((item) => (
            <Link
              key={item.label}
              to={item.path}
              style={{
                color: "white",
                textDecoration: "none",
                fontSize: "15px",
                fontWeight: 500,
                transition: "0.2s",
              }}
              onMouseOver={(e) =>
                ((e.target as HTMLElement).style.color = "#3b82f6")
              }
              onMouseOut={(e) =>
                ((e.target as HTMLElement).style.color = "white")
              }
            >
              {item.label}
            </Link>
          ))}
        </Box>

        {/* RIGHT ICONS */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton sx={{ color: "white", "&:hover": { color: "#3b82f6" } }}>
            <SearchIcon />
          </IconButton>

          <IconButton sx={{ color: "white", "&:hover": { color: "#3b82f6" } }}>
            <NotificationsIcon />
          </IconButton>

          {/* ACCOUNT / AVATAR */}
          <IconButton onClick={handleMenu} sx={{ p: 0 }}>
            {user.token ? (
              <Avatar sx={{ width: 32, height: 32, bgcolor: "#5b21b6" }}>
                {user.role === "ADMIN" ? "A" : "U"}
              </Avatar>
            ) : (
              <AccountCircleIcon
                sx={{
                  color: "white",
                  fontSize: 30,
                  "&:hover": { color: "#3b82f6" },
                }}
              />
            )}
          </IconButton>

          {/* MENU DROPDOWN */}
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              PaperProps={{
                sx: {
                  backgroundColor: "#111",
                  color: "#fff",
                  mt: 1,
                  width: 200,
                  border: "1px solid #333",
                },
              }}
            >
              {user.token
                ? [
                    <MenuItem key="email" disabled sx={{ color: "#888" }}>
                      Email: {localStorage.getItem("email")}
                    </MenuItem>,

                    <Divider key="divider1" sx={{ borderColor: "#444" }} />,

                    <MenuItem
                      key="settings"
                      onClick={() => {
                        navigate("/settings");
                        handleClose();
                      }}
                      sx={{
                        "&:hover": { backgroundColor: "#222" },
                        gap: 1.5,
                      }}
                    >
                      <SettingsIcon fontSize="small" />
                      Cài đặt
                    </MenuItem>,

                    <MenuItem
                      key="logout"
                      onClick={() => {
                        logout();
                        handleClose();
                      }}
                      sx={{
                        color: "#ff4d4d",
                        fontWeight: "bold",
                        gap: 1.5,
                        "&:hover": { backgroundColor: "rgba(255,77,77,0.1)" },
                      }}
                    >
                      <LogoutIcon fontSize="small" />
                      Logout
                    </MenuItem>,
                  ]
                : [
                    <MenuItem key="login" component={Link} to="/login">
                      Đăng nhập
                    </MenuItem>,

                    <MenuItem key="register" component={Link} to="/register">
                      Đăng ký
                    </MenuItem>,
                  ]}
            </Menu>

        </Box>
      </Toolbar>
    </AppBar>
  );
}

import {
  Box,
  Typography,
  Avatar,
  Switch,
  TextField,
  Button,
  Divider,
  Paper,
} from "@mui/material";
import SecurityIcon from "@mui/icons-material/Security";
import EmailIcon from "@mui/icons-material/Email";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import PasswordIcon from "@mui/icons-material/Password";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { useState } from "react";

export const SettingsPage = () => {
  const [enableNotif, setEnableNotif] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [twoFA, setTwoFA] = useState(false);

  return (
    <Box
      sx={{
        p: 4,
        minHeight: "100vh",
        background:
          "linear-gradient(to bottom right, #0f0f20, #151530, #0d0d16)",
        color: "#fff",
      }}
    >
      <Typography
        variant="h4"
        sx={{ fontWeight: 700, mb: 4, display: "flex", gap: 1 }}
      >
        ⚙️ Cài Đặt Tài Khoản
      </Typography>

      {/* ---------------- USER PROFILE ---------------- */}
      <Paper
        sx={{
          p: 3,
          mb: 4,
          background: "rgba(255,255,255,0.04)",
          borderRadius: 3,
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Thông tin cá nhân
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          <Avatar
            sx={{
              width: 80,
              height: 80,
              bgcolor: "#3b82f6",
              fontSize: "2rem",
            }}
          >
            U
          </Avatar>

          <Box>
            <Typography sx={{ fontSize: "1.2rem" }}>User Profile</Typography>
            <Typography sx={{ color: "#aaa" }}>
              Email: user@gmail.com
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 3, borderColor: "#333" }} />

        <Typography sx={{ fontWeight: 500, mb: 1 }}>Đổi mật khẩu</Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            type="password"
            label="Mật khẩu mới"
            fullWidth
            sx={{
              input: { color: "#fff" },
              label: { color: "#999" },
            }}
          />
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#3b82f6",
              textTransform: "none",
            }}
          >
            Cập nhật
          </Button>
        </Box>
      </Paper>

      {/* ---------------- NOTIFICATIONS ---------------- */}
      <Paper
        sx={{
          p: 3,
          mb: 4,
          background: "rgba(255,255,255,0.04)",
          borderRadius: 3,
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Thông báo
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <NotificationsActiveIcon />
            <Typography>Bật thông báo</Typography>
          </Box>
          <Switch
            checked={enableNotif}
            onChange={() => setEnableNotif(!enableNotif)}
          />
        </Box>
      </Paper>

      {/* ---------------- UI THEME + SECURITY ---------------- */}
      <Paper
        sx={{
          p: 3,
          mb: 4,
          background: "rgba(255,255,255,0.04)",
          borderRadius: 3,
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Giao diện & Bảo mật
        </Typography>

        {/* DARK MODE */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <DarkModeIcon />
            <Typography>Dark Mode</Typography>
          </Box>
          <Switch
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
        </Box>

        {/* 2FA */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <SecurityIcon />
            <Typography>Bảo mật 2 lớp (2FA)</Typography>
          </Box>
          <Switch checked={twoFA} onChange={() => setTwoFA(!twoFA)} />
        </Box>
      </Paper>

      {/* ---------------- DELETE ACCOUNT ---------------- */}
      <Paper
        sx={{
          p: 3,
          background: "rgba(255,0,0,0.05)",
          borderRadius: 3,
          border: "1px solid rgba(255,0,0,0.3)",
          backdropFilter: "blur(10px)",
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, color: "#ff4d4d", mb: 1 }}
        >
          Xóa tài khoản
        </Typography>
        <Typography sx={{ mb: 2, color: "#ff9999" }}>
          Hành động này không thể hoàn tác. Hãy chắc chắn.
        </Typography>

        <Button
          startIcon={<DeleteForeverIcon />}
          variant="outlined"
          sx={{
            color: "#ff4d4d",
            borderColor: "#ff4d4d",
            "&:hover": {
              backgroundColor: "rgba(255,0,0,0.1)",
              borderColor: "#ff6666",
            },
          }}
        >
          Xóa tài khoản
        </Button>
      </Paper>
    </Box>
  );
};

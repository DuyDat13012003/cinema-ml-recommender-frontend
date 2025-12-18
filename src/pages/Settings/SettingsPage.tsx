// =========================================================
// src/pages/Settings/SettingsPage.tsx — FULL WORKING VERSION
// =========================================================

import {
  Box,
  Typography,
  Avatar,
  Switch,
  TextField,
  Button,
  Divider,
  Paper,
  Alert,
} from "@mui/material";

import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import LogoutIcon from "@mui/icons-material/Logout";

export const SettingsPage = () => {
  const { user, updatePassword, logout } = useAuth();

  // UI states
  const [newPass, setNewPass] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const [enableNotif, setEnableNotif] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [twoFA, setTwoFA] = useState(false);

  const email = user.email || "unknown@gmail.com";
  const displayName = email.split("@")[0];
  const firstLetter = displayName.charAt(0).toUpperCase();

  // ---------------------------------------------------------
  // CHANGE PASSWORD HANDLER
  // ---------------------------------------------------------
  const handleChangePassword = async () => {
    if (newPass.length < 6) {
      setErr("Mật khẩu phải từ 6 ký tự trở lên!");
      setMsg(null);
      return;
    }

    const error = await updatePassword(newPass);

    if (error) {
      setErr(error);
      setMsg(null);
      return;
    }

    setErr(null);
    setMsg("Đổi mật khẩu thành công! 🎉");
    setNewPass("");
  };

  return (
    <Box
      sx={{
        p: 4,
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #0f0f20, #151530, #0d0d16)",
        color: "#fff",
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
        ⚙️ Cài Đặt Tài Khoản
      </Typography>

      {/* ================= USER PROFILE ================= */}
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
            {firstLetter}
          </Avatar>

          <Box>
            <Typography sx={{ fontSize: "1.2rem" }}>{displayName}</Typography>
            <Typography sx={{ color: "#aaa" }}>Email: {email}</Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 3, borderColor: "#333" }} />

        {/* ================= CHANGE PASSWORD ================= */}
        <Typography sx={{ fontWeight: 500, mb: 1 }}>Đổi mật khẩu</Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            type="password"
            label="Mật khẩu mới"
            fullWidth
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
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
            onClick={handleChangePassword}
          >
            Cập nhật
          </Button>
        </Box>

        {err && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {err}
          </Alert>
        )}

        {msg && (
          <Alert severity="success" sx={{ mt: 2 }}>
            {msg}
          </Alert>
        )}
      </Paper>

      {/* ================= NOTIFICATIONS ================= */}
      <Paper
        sx={{
          p: 3,
          mb: 4,
          background: "rgba(255,255,255,0.04)",
          borderRadius: 3,
          border: "1px solid rgba(255,255,255,0.1)",
          backdropFilter: "blur(10px)",
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Thông báo
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography>Bật thông báo</Typography>
          <Switch checked={enableNotif} onChange={() => setEnableNotif(!enableNotif)} />
        </Box>
      </Paper>

      {/* ================= UI + SECURITY ================= */}
      <Paper
        sx={{
          p: 3,
          mb: 4,
          background: "rgba(255,255,255,0.04)",
          borderRadius: 3,
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Giao diện & Bảo mật
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography>Dark Mode</Typography>
          <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography>Bảo mật 2 lớp (2FA)</Typography>
          <Switch checked={twoFA} onChange={() => setTwoFA(!twoFA)} />
        </Box>
      </Paper>

      {/* ================= DELETE ACCOUNT ================= */}
      <Paper
        sx={{
          p: 3,
          background: "rgba(255,0,0,0.05)",
          borderRadius: 3,
          border: "1px solid rgba(255,0,0,0.3)",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600, color: "#ff4d4d", mb: 1 }}>
          Xóa tài khoản
        </Typography>

        <Typography sx={{ mb: 2, color: "#ff9999" }}>
          Hành động này không thể hoàn tác.
        </Typography>

        <Button
          startIcon={<LogoutIcon />}
          variant="outlined"
          sx={{
            color: "#ff4d4d",
            borderColor: "#ff4d4d",
            "&:hover": { background: "rgba(255,0,0,0.1)" },
          }}
          onClick={logout}
        >
          Xóa tài khoản
        </Button>
      </Paper>
    </Box>
  );
};

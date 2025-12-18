// ============================
// src/pages/Auth/Login.tsx
// ============================
import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
  Alert,
} from "@mui/material";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    const err = await login(email, password);

    if (err) {
      setError(err);
      return;
    }

    const role = localStorage.getItem("role");
    navigate(role === "ADMIN" ? "/admin" : "/");
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
      <Card sx={{ width: 420, background: "#151925", color: "#fff" }}>
        <CardContent>
          <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
            Đăng nhập
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <TextField
            fullWidth
            label="Email"
            variant="filled"
            sx={{ mb: 2, input: { color: "white" } }}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            fullWidth
            label="Mật khẩu"
            type="password"
            variant="filled"
            sx={{ mb: 1, input: { color: "white" } }}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* ⭐ QUÊN MẬT KHẨU */}
          <Typography
            sx={{
              textAlign: "right",
              mb: 3,
              mt: 1,
              color: "#4A90E2",
              cursor: "pointer",
              fontSize: 14,
            }}
            onClick={() => navigate("/forgot-password")}
          >
            Quên mật khẩu?
          </Typography>

          <Button
            fullWidth
            variant="contained"
            sx={{ py: 1.4, background: "#4A90E2" }}
            onClick={handleLogin}
          >
            Đăng nhập
          </Button>

          <Typography sx={{ textAlign: "center", mt: 2 }}>
            Chưa có tài khoản?{" "}
            <span
              style={{ color: "#4A90E2", cursor: "pointer" }}
              onClick={() => navigate("/register")}
            >
              Đăng ký ngay
            </span>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;

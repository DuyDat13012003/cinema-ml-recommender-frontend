// ====================== Register.tsx (FIXED) ======================
import {
  Box,
  Card,
  CardContent,
  TextField,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const validate = () => {
    if (!email.includes("@")) {
      setError("Email không hợp lệ.");
      return false;
    }
    if (password.length < 6) {
      setError("Mật khẩu phải từ 6 ký tự trở lên.");
      return false;
    }
    if (password !== rePassword) {
      setError("Mật khẩu nhập lại không khớp.");
      return false;
    }
    setError("");
    return true;
  };

  const handleRegister = async () => {
    if (!validate()) return;

    setLoading(true);
    const err = await register(email, password);
    setLoading(false);

    if (err) {
      setError(err);
      return;
    }

    // Nếu không có lỗi → đăng ký thành công
    alert("🎉 Tạo tài khoản thành công! Hãy đăng nhập.");
    navigate("/login");
  };


  return (
    <Box sx={{ minHeight: "100vh", background: "#0f0f1e", display: "flex", justifyContent: "center", alignItems: "center", px: 2 }}>
      <Card sx={{ maxWidth: 420, width: "100%", background: "#151925", color: "white", borderRadius: 3, p: 2 }}>
        <CardContent>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
            Đăng Ký
          </Typography>

          <TextField
            label="Email"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2, input: { color: "white" }, label: { color: "#bbb" } }}
          />

          <TextField
            label="Mật khẩu"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 2, input: { color: "white" }, label: { color: "#bbb" } }}
          />

          <TextField
            label="Nhập lại mật khẩu"
            type="password"
            fullWidth
            value={rePassword}
            onChange={(e) => setRePassword(e.target.value)}
            sx={{ mb: 1, input: { color: "white" }, label: { color: "#bbb" } }}
          />

          {error && <Typography sx={{ color: "#ff6b6b", mb: 2 }}>{error}</Typography>}

          <Button
            fullWidth
            variant="contained"
            disabled={loading}
            onClick={handleRegister}
            sx={{ mt: 1, py: 1.2, background: "#48bb78", fontWeight: 700 }}
          >
            {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Tạo tài khoản"}
          </Button>

          <Box sx={{ mt: 3, textAlign: "center" }}>
            <Typography>
              Đã có tài khoản?{" "}
              <Link to="/login" style={{ color: "#63b3ed" }}>
                Đăng nhập
              </Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

// ========================== ForgotPassword.tsx ==========================
import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Typography,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export const ForgotPassword = () => {
  const { sendResetOTP } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSend = async () => {
    setError(null);
    setSuccess(null);

    if (!email.includes("@")) {
      setError("Email không hợp lệ");
      return;
    }

    setLoading(true);
    const err = await sendResetOTP(email);
    setLoading(false);

    if (err) {
      setError(err);
    } else {
      setSuccess("Mã OTP đã được gửi!");
      setTimeout(() => navigate("/verify-otp"), 1200);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #6b21a8, #2563eb)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Card
        sx={{
          width: 420,
          background: "rgba(255,255,255,0.1)",
          color: "white",
          backdropFilter: "blur(12px)",
          borderRadius: 3,
        }}
      >
        <CardContent>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
            Khôi phục mật khẩu
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {success}
            </Alert>
          )}

          <TextField
            label="Email đăng ký"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputLabelProps={{ style: { color: "#ddd" } }}
            inputProps={{ style: { color: "white" } }}
            sx={{ mb: 3 }}
          />

          <Button
            fullWidth
            variant="contained"
            onClick={handleSend}
            disabled={loading}
            sx={{ py: 1.5, fontWeight: 600 }}
          >
            {loading ? <CircularProgress size={22} sx={{ color: "#fff" }} /> : "Gửi mã khôi phục"}
          </Button>

          <Typography sx={{ mt: 2, textAlign: "center" }}>
            <span
              style={{ cursor: "pointer", color: "#90cdf4" }}
              onClick={() => navigate("/login")}
            >
              Quay lại đăng nhập
            </span>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

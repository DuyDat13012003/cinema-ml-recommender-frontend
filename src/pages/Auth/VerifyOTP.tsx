// ============================ VerifyOTP.tsx ============================
import { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Typography,
  Button,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export const VerifyOTP = () => {
  const { verifyOTP, sendResetOTP } = useAuth();
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [count, setCount] = useState(30);
  const email = localStorage.getItem("reset_email");

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((c) => (c > 0 ? c - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleVerify = async () => {
    setError(null);

    const err = await verifyOTP(otp);
    if (err) {
      setError(err);
      return;
    }

    setSuccess("Xác thực thành công!");
    setTimeout(() => navigate("/reset-password"), 1200);
  };

  const handleResend = async () => {
    if (!email) return;
    await sendResetOTP(email);
    setCount(30);
    setSuccess("Đã gửi lại mã OTP!");
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
            Xác thực OTP
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

          <TextField
            label="Mã OTP (6 số)"
            fullWidth
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            InputLabelProps={{ style: { color: "#ddd" } }}
            inputProps={{ style: { color: "white" } }}
            sx={{ mb: 3 }}
          />

          <Button fullWidth variant="contained" sx={{ py: 1.5 }} onClick={handleVerify}>
            Xác nhận
          </Button>

          <Typography sx={{ mt: 2, textAlign: "center" }}>
            {count > 0 ? (
              <>Gửi lại mã sau <b>{count}s</b></>
            ) : (
              <span style={{ cursor: "pointer", color: "#90cdf4" }} onClick={handleResend}>
                Gửi lại mã OTP
              </span>
            )}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

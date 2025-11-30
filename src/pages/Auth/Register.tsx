import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import {
  Box,
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
} from "@mui/material";

export const Register = () => {
  const { register } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    await register(email, password);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #6b21a8, #2563eb)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
      }}
    >
      <Card
        sx={{
          width: 400,
          backdropFilter: "blur(12px)",
          background: "rgba(255,255,255,0.1)",
          borderRadius: "16px",
          color: "white",
          p: 2,
        }}
      >
        <CardContent>
          <Typography variant="h4" sx={{ fontWeight: 700, textAlign: "center", mb: 3 }}>
            Đăng ký
          </Typography>

          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            sx={{ mb: 2 }}
            InputLabelProps={{ style: { color: "#ddd" } }}
            inputProps={{ style: { color: "white" } }}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            fullWidth
            label="Mật khẩu"
            type="password"
            variant="outlined"
            sx={{ mb: 3 }}
            InputLabelProps={{ style: { color: "#ddd" } }}
            inputProps={{ style: { color: "white" } }}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            fullWidth
            variant="contained"
            sx={{
              py: 1.5,
              background: "rgba(255,255,255,0.25)",
              fontWeight: 700,
              "&:hover": { background: "rgba(255,255,255,0.35)" },
            }}
            onClick={handleRegister}
          >
            Đăng ký
          </Button>

          <Typography sx={{ mt: 2, textAlign: "center" }}>
            Đã có tài khoản?{" "}
            <a href="/login" style={{ color: "#fff", fontWeight: 700 }}>
              Đăng nhập
            </a>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

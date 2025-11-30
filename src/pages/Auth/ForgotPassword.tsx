import { useState } from "react";
import { Box, Card, CardContent, TextField, Typography, Button } from "@mui/material";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  return (
    <Box sx={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #6b21a8, #2563eb)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      p: 2
    }}>
      <Card sx={{ width: 400, background: "rgba(255,255,255,0.1)", backdropFilter: "blur(12px)", color: "white" }}>
        <CardContent>
          <Typography variant="h5" sx={{ mb: 3 }}>Khôi phục mật khẩu</Typography>

          <TextField
            fullWidth
            label="Email đăng ký"
            InputLabelProps={{ style: { color: "#ccc" } }}
            inputProps={{ style: { color: "white" } }}
            sx={{ mb: 3 }}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Button fullWidth variant="contained" sx={{ py: 1.5 }}>
            Gửi mã khôi phục
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

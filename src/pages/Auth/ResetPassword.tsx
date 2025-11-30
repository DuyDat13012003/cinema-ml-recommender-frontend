import { useState } from "react";
import { Box, Card, CardContent, TextField, Typography, Button } from "@mui/material";

export const ResetPassword = () => {
  const [password, setPassword] = useState("");

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
          <Typography variant="h5" sx={{ mb: 3 }}>Đặt lại mật khẩu</Typography>

          <TextField
            fullWidth
            label="Mật khẩu mới"
            type="password"
            InputLabelProps={{ style: { color: "#ccc" } }}
            inputProps={{ style: { color: "white" } }}
            sx={{ mb: 3 }}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button fullWidth variant="contained" sx={{ py: 1.5 }}>
            Cập nhật mật khẩu
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

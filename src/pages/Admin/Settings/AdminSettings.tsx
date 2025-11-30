// src/pages/Admin/AdminSettings.tsx
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Button,
  Divider,
} from "@mui/material";
import { useAdminSettings } from "../../../hooks/admin/useAdminSettings";

export const AdminSettings = () => {
  const { profile, activity, security } = useAdminSettings();

  return (
    <Box>
      {/* TITLE */}
      <Typography
        variant="h4"
        sx={{ color: "white", mb: 4, fontWeight: 700 }}
      >
        Cài đặt hệ thống
      </Typography>

      {/* THÔNG TIN ADMIN */}
      <Card sx={{ background: "#1a1a2e", color: "#fff", mb: 4 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Thông tin tài khoản
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            <Avatar src={profile.avatar} sx={{ width: 70, height: 70 }} />

            <Box>
              <Typography sx={{ fontSize: 18, fontWeight: 600 }}>
                {profile.name}
              </Typography>
              <Typography sx={{ color: "#aaa" }}>{profile.email}</Typography>
              <Typography sx={{ color: "#aaa" }}>{profile.role}</Typography>
            </Box>
          </Box>

          <Button
            variant="contained"
            sx={{
              mt: 3,
              background: "#4299e1",
              "&:hover": { background: "#3b8cd3" },
            }}
          >
            Cập nhật thông tin
          </Button>
        </CardContent>
      </Card>

      {/* HOẠT ĐỘNG HỆ THỐNG */}
      <Card sx={{ background: "#1a1a2e", color: "#fff", mb: 4 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Hoạt động hệ thống
          </Typography>

          <Typography sx={{ color: "#aaa", lineHeight: 1.7 }}>
            • Đăng nhập gần nhất: {activity.lastLogin}
            <br />• Địa chỉ IP: {activity.ip}
            <br />• Trình duyệt: {activity.browser}
            <br />• Thiết bị: {activity.device}
            <br />
            <br />
            • Các thay đổi gần đây:
            {activity.recentChanges.map((log: string, index: number) => (
              <Typography key={index} component="div">
                - {log}
              </Typography>
            ))}
          </Typography>

          <Button
            variant="outlined"
            sx={{
              mt: 3,
              borderColor: "#4299e1",
              color: "#4299e1",
              "&:hover": {
                borderColor: "#3b8cd3",
                color: "#3b8cd3",
              },
            }}
          >
            Xem toàn bộ nhật ký
          </Button>
        </CardContent>
      </Card>

      {/* BẢO MẬT */}
      <Card sx={{ background: "#1a1a2e", color: "#fff" }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Bảo mật
          </Typography>

          <Typography sx={{ color: "#aaa", mb: 2, lineHeight: 1.7 }}>
            • Mật khẩu mạnh: {security.passwordStrength}
            <br />• Xác thực 2 lớp (2FA): {security.twoFA}
            <br />• Phiên đăng nhập: Tự động đăng xuất sau {security.sessionTimeout}
            <br />• Địa chỉ IP đáng tin cậy: {security.trustedIPs} địa chỉ
          </Typography>

          <Divider sx={{ borderColor: "#333", my: 2 }} />

          <Button
            variant="contained"
            sx={{
              background: "#4299e1",
              "&:hover": { background: "#3b8cd3" },
              mr: 2,
            }}
          >
            Thiết lập 2FA
          </Button>

          <Button
            variant="outlined"
            sx={{
              borderColor: "#4299e1",
              color: "#4299e1",
              "&:hover": { borderColor: "#3b8cd3", color: "#3b8cd3" },
            }}
          >
            Đổi mật khẩu
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

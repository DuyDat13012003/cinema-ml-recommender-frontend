// src/hooks/admin/useAdminSettings.ts

export interface AdminProfile {
  name: string;
  email: string;
  role: string;
  avatar: string;
}

export interface AdminSecurity {
  passwordStrength: string;
  twoFA: string;
  sessionTimeout: string;
  trustedIPs: number;
}

export interface AdminActivity {
  lastLogin: string;
  ip: string;
  browser: string;
  device: string;
  recentChanges: string[];
}

export const useAdminSettings = () => {
  // MOCK 1 — Thông tin tài khoản
  const profile: AdminProfile = {
    name: "Admin",
    email: "admin@example.com",
    role: "Quản trị viên hệ thống",
    avatar: "https://ui-avatars.com/api/?name=Admin",
  };

  // MOCK 2 — Hoạt động hệ thống
  const activity: AdminActivity = {
    lastLogin: "10:21 - 22/11/2025",
    ip: "192.168.1.14",
    browser: "Chrome 118",
    device: "Windows 10",
    recentChanges: [
      "Cập nhật rạp CGV Vincom (09:45)",
      "Tạo suất chiếu mới cho phim Dune 2 (09:10)",
    ],
  };

  // MOCK 3 — Bảo mật
  const security: AdminSecurity = {
    passwordStrength: "Đã bật",
    twoFA: "Đang bật",
    sessionTimeout: "30 phút",
    trustedIPs: 1,
  };

  return {
    profile,
    activity,
    security,
    isLoading: false,
  };
};

// =========================================================
// src/context/AuthContext.tsx — FULL VERSION + Update Password
// =========================================================
import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface UserData {
  email: string;
  password: string;
  role: "USER" | "ADMIN";
}

interface AuthContextType {
  user: { email: string | null; role: "USER" | "ADMIN" | null };

  login: (email: string, password: string) => Promise<string | null>;
  register: (email: string, password: string) => Promise<string | null>;
  logout: () => void;

  // Forgot Password (OTP)
  sendResetOTP: (email: string) => Promise<string | null>;
  verifyOTP: (otp: string) => Promise<string | null>;
  resetPassword: (newPass: string) => Promise<string | null>;

  // ⭐ NEW: Update password inside Settings
  updatePassword: (newPass: string) => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // =========================================================
  // USER STATE (read from localStorage)
  // =========================================================
  const [user, setUser] = useState(() => ({
    email: localStorage.getItem("email"),
    role: (localStorage.getItem("role") as "USER" | "ADMIN" | null) || null,
  }));

  // =========================================================
  // AUTO-CREATE ADMIN
  // =========================================================
  useEffect(() => {
    let users: UserData[] = [];

    try {
      users = JSON.parse(localStorage.getItem("users") || "[]");
    } catch {
      users = [];
    }

    if (!users.some((u) => u.email === "admin@gmail.com")) {
      users.push({
        email: "admin@gmail.com",
        password: "admin123",
        role: "ADMIN",
      });
      localStorage.setItem("users", JSON.stringify(users));
      console.log("⭐ Admin created: admin@gmail.com / admin123");
    }
  }, []);

  // Helpers
  const loadUsers = (): UserData[] => {
    try {
      return JSON.parse(localStorage.getItem("users") || "[]");
    } catch {
      return [];
    }
  };

  const saveUsers = (users: UserData[]) => {
    localStorage.setItem("users", JSON.stringify(users));
  };

  // =========================================================
  // LOGIN
  // =========================================================
  const login = async (email: string, password: string) => {
    const users = loadUsers();
    const found = users.find((u) => u.email === email);

    if (!found) return "Email không tồn tại!";
    if (found.password !== password) return "Sai mật khẩu!";

    localStorage.setItem("email", found.email);
    localStorage.setItem("role", found.role);

    setUser({ email: found.email, role: found.role });
    return null;
  };

  // =========================================================
  // REGISTER
  // =========================================================
  const register = async (email: string, password: string) => {
    const users = loadUsers();
    if (users.some((u) => u.email === email)) return "Email đã tồn tại!";

    users.push({ email, password, role: "USER" });
    saveUsers(users);
    return null;
  };

  // =========================================================
  // LOGOUT
  // =========================================================
  const logout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("role");

    setUser({ email: null, role: null });
    window.location.href = "/login";
  };

  // =========================================================
  // FORGOT PASSWORD
  // =========================================================
  const sendResetOTP = async (email: string) => {
    const users = loadUsers();
    const exists = users.some((u) => u.email === email);
    if (!exists) return "Email không tồn tại!";

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    localStorage.setItem("reset_email", email);
    localStorage.setItem("reset_otp", otp);

    console.log("⭐ OTP:", otp);

    return null;
  };

  const verifyOTP = async (otp: string) => {
    const realOTP = localStorage.getItem("reset_otp");
    if (!realOTP) return "OTP đã hết hạn!";
    if (otp !== realOTP) return "OTP không đúng!";
    return null;
  };

  const resetPassword = async (newPass: string) => {
    const email = localStorage.getItem("reset_email");
    if (!email) return "Không tìm thấy email reset!";

    const users = loadUsers();
    const updated = users.map((u) =>
      u.email === email ? { ...u, password: newPass } : u
    );

    saveUsers(updated);

    localStorage.removeItem("reset_email");
    localStorage.removeItem("reset_otp");

    return null;
  };

  // =========================================================
  // ⭐ NEW — CHANGE PASSWORD FROM SETTINGS
  // =========================================================
  const updatePassword = async (newPass: string) => {
    if (!user.email) return "Bạn chưa đăng nhập!";

    const users = loadUsers();
    const updated = users.map((u) =>
      u.email === user.email ? { ...u, password: newPass } : u
    );

    saveUsers(updated);
    return null;
  };

  // =========================================================
  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        sendResetOTP,
        verifyOTP,
        resetPassword,
        updatePassword, // ⭐ EXPORTED
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthContext must be inside AuthProvider");
  return ctx;
};

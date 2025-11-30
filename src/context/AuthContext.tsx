// src/context/AuthContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
  user: {
    token: string | null;
    role: "USER" | "ADMIN" | null;
  };
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState({
    token: localStorage.getItem("token"),
    role: (localStorage.getItem("role") as "USER" | "ADMIN" | null) || null,
  });
  /** LOGIN MOCK (Bạn sẽ thay bằng API backend sau này) */
  const login = async (email: string, password: string) => {
    // MOCK: nếu nhập admin@gmail.com → là ADMIN
    let mockRole: "USER" | "ADMIN" = email === "admin@gmail.com" ? "ADMIN" : "USER";
    
    const mockToken = "FAKE_JWT_TOKEN_123";
    localStorage.setItem("email", email);
    localStorage.removeItem("email");
    localStorage.setItem("token", mockToken);
    localStorage.setItem("role", mockRole);

    setUser({ token: mockToken, role: mockRole });

    // Redirect theo role
    if (mockRole === "ADMIN") {
      window.location.href = "/admin";
    } else {
      window.location.href = "/";
    }
  };

  /** REGISTER MOCK */
  const register = async (email: string, password: string) => {
    // Sau khi đăng ký → tự login luôn
    await login(email, password);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setUser({ token: null, role: null });
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthContext must be used inside AuthProvider");
  return ctx;
};

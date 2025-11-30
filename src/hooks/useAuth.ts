// src/hooks/useAuth.ts
import { useAuthContext } from "../context/AuthContext";

export const useAuth = () => {
  const { user, login, register, logout } = useAuthContext();
  return { user, login, register, logout };
};

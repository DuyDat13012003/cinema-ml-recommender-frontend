// src/hooks/useAuth.ts
import { useAuthContext } from "../context/AuthContext";

export const useAuth = () => {
  const {
    user,
    login,
    register,
    logout,
    sendResetOTP,
    verifyOTP,
    resetPassword,
    updatePassword, // ⭐ MUST EXPORT THIS
  } = useAuthContext();

  return {
    user,
    login,
    register,
    logout,
    sendResetOTP,
    verifyOTP,
    resetPassword,
    updatePassword, // ⭐ RETURN IT HERE
  };
};

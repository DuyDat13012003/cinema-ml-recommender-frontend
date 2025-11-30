import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();

  if (!user.token) return <Navigate to="/login" replace />;
  if (user.role !== "ADMIN") return <Navigate to="/" replace />;

  return <>{children}</>;
};

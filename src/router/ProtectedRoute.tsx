import { Navigate } from "react-router-dom";
import React from "react";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const email = localStorage.getItem("email");

  if (!email) return <Navigate to="/login" replace />;

  return <>{children}</>;
};

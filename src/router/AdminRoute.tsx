// src/router/AdminRoute.tsx
import { Navigate } from "react-router-dom";
import React from "react";

export const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const role = localStorage.getItem("role");

  if (!role) return <Navigate to="/login" replace />;
  if (role !== "ADMIN") return <Navigate to="/" replace />;

  return <>{children}</>;
};

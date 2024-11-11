import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../providers/auth-provider/hook";

export const ProtectedRoute = () => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/register" />;
  }

  return <Outlet />;
};

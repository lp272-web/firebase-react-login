import { Navigate, useLocation } from "react-router";
import { useAuth } from "../hooks/authContext";

export default function OnlyUnauthRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Verifying authentication session...</div>;
  }

  if (user) {
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
  }

  return children;
}

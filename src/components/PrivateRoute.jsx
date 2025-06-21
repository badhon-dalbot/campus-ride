// components/PrivateRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../assets/AuthContext";

export default function PrivateRoute({ children }) {
  const { isLoggedIn } = useAuth();

  //   if (loading) return null; // or spinner

  return isLoggedIn ? children : <Navigate to="/login" replace />;
}

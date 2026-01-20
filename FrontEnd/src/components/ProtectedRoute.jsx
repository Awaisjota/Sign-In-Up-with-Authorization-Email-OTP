import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
export default function ProtectedRoute({ children }) {
  const isAuth = useSelector((s) => s.auth.isAuth);
  return isAuth ? children : <Navigate to="/login" />;
}

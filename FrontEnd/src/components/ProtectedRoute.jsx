import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectToken, selectAuthRole } from "../features/authSlice";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const token = useSelector(selectToken) || localStorage.getItem("token");
  const role = useSelector(selectAuthRole) || localStorage.getItem("role");

  if (!token) return <Navigate to="/login" replace />;

  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;

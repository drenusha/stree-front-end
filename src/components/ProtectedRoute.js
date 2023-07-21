import { Navigate } from "react-router-dom";
import Auth from "./auth";

const Protected = ({ children }) => {
  Auth.checkAuth();
  return Auth.isAuthenticated ? children : <Navigate to="/" replace />;
};
export default Protected;

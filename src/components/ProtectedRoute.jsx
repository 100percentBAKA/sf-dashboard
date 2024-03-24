import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "../context/AuthContext";

const debug = true;

export const ProtectedRoute1 = ({ children }) => {
  const { isAuthenticated } = useAuth();
  debug && console.log(isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/auth/login" replace />;
};

export const ProtectedRoute2 = ({ children }) => {
  const { isAuthenticated } = useAuth();
  debug && console.log(isAuthenticated);
  return isAuthenticated ? <Navigate to="/app/dashboard" replace /> : children;
};

export const ProtectedRoute3 = () => {
  const { isAuthenticated } = useAuth();
  debug && console.log(isAuthenticated);
  return isAuthenticated ? (
    <Navigate to="/app/dashboard" replace />
  ) : (
    <Navigate to="/auth/login" replace />
  );
};

ProtectedRoute1.propTypes = {
  children: PropTypes.node.isRequired,
};

ProtectedRoute2.propTypes = {
  children: PropTypes.node.isRequired,
};

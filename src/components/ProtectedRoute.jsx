import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "../context/AuthContext";

const debug = false;

export const ProtectedRoute1 = ({ children }) => {
  const { isAuthenticated } = useAuth();
  debug && console.log(isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/auth/login" replace />;
};

export const ProtectedRoute2 = ({ children }) => {
  const { isAuthenticated } = useAuth();
  debug && console.log(isAuthenticated);
  return isAuthenticated ? <Navigate to="/app/dashboard" /> : children;
};

export const ProtectedRoute3 = () => {
  const { isAuthenticated } = useAuth();
  debug && console.log(`is authenticated: ${isAuthenticated}`);
  return isAuthenticated ? (
    <Navigate to="/app/dashboard" />
  ) : (
    <Navigate to="/auth/login" />
  );
};

ProtectedRoute1.propTypes = {
  children: PropTypes.node.isRequired,
};

ProtectedRoute2.propTypes = {
  children: PropTypes.node.isRequired,
};

import { createContext, useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";

// * DEBUG MODE
const debug = true;

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [persist, setPersist] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setIsAuthenticated(!!token); // * double negation converts token into boolean value
  }, []);

  const login = (access_token, refresh_token) => {
    const storage = persist ? localStorage : sessionStorage;
    storage.setItem("access_token", access_token);
    storage.setItem("refresh_token", refresh_token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    persist ? localStorage.clear() : sessionStorage.clear();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        login,
        logout,
        persist,
        setPersist,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

export default AuthContext;

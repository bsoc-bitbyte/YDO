import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { checkLoginStatus } from "../../utils/checkLoginStatus";
const API_BASE_URL = import.meta.env.VITE_API_URL || "";

const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const loggedIn = await checkLoginStatus(API_BASE_URL);
      setIsAuthenticated(loggedIn);
    };
    checkAuth();
  }, []);

  if (isAuthenticated === null) return <div>Loading...</div>;

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { checkLoginStatus } from "../../utils/checkLoginStatus";
import Preloader from "../../pages/Preloader/Preloader";

const API_BASE_URL = import.meta.env.VITE_API_URL || "";

const PrivateRoutesWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const loggedIn = await checkLoginStatus(API_BASE_URL);
      setIsAuthenticated(loggedIn);
    };
    checkAuth();
  }, []);

  if (isAuthenticated === null) return <Preloader />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return <Outlet />;
};

export default PrivateRoutesWrapper;

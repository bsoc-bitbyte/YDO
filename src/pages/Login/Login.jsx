import { useState, useEffect } from "react";
import "./Login.css";
import Button from "../../components/button/Button";
import { checkLoginStatus } from "../../utils/checkLoginStatus";

const Login = ({ onLogin }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_URL || "";

  useEffect(() => {
    const checkLogin = async () => {
      const isLoggedIn = await checkLoginStatus(API_BASE_URL);
      setLoggedIn(isLoggedIn);
      setIsLoading(false);
    };

    checkLogin();
  }, []);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError(null);
    window.location = `${API_BASE_URL}/auth/signin/google`;
  };

  if (loggedIn) {
    window.location.href = "/";
  }

  return (
    <div className="login-container">
      <span>Sign in to YDO</span>
      <Button
        onClick={handleGoogleLogin}
        disabled={isLoading}
        className="primary"
      >
        {isLoading ? "loading..." : "Sign in with Google"}
      </Button>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Login;

import { useState, useEffect } from "react";
import "./Login.css";
import Button from "../../lib/button/Button.jsx";

const Login = ({ onLogin }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_URL || "";

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) {
          setIsLoading(false);
          return;
        }

        const response = await fetch(`${API_BASE_URL}/auth/user`, {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          setLoggedIn(true);
        } else {
          setIsLoading(false);
        }
      } catch (err) {
        setIsLoading(false);
        setLoggedIn(false);
        console.error("Error checking login status:", err);
      }
    };

    checkLoginStatus();
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

import React, { useState, useEffect } from "react";
import "./Login.css";

const Login = ({ onLogin }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const API_BASE_URL = import.meta.env.VITE_API_URL || "";

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/auth/user`, {
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
          if (onLogin) onLogin(userData);
        }
      } catch (err) {
        console.error("Error checking login status:", err);
      }
    };

    checkLoginStatus();
  }, [onLogin, API_BASE_URL]);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError(null);
    window.location = `${API_BASE_URL}/auth/signin/google`
  };

  const handleLogout = async () => {
    setIsLoading(true);
    window.location = `${API_BASE_URL}/auth/signout`
  };

  if (user) {
    return (
      <div className="login-container logged-in">
        <div className="user-info">
          <img
            src={user?.avatar_url || "default-avatar.png"}
            alt="Profile"
            className="avatar"
          />
          <span>
            Welcome, {user?.name || user?.email || "User"}
          </span>
        </div>
        <button
          onClick={handleLogout}
          disabled={isLoading}
          className="logout-btn"
        >
          {isLoading ? "Signing out..." : "Sign out"}
        </button>
        {error && <p className="error-message">{error}</p>}
      </div>
    );
  }

  return (
    <div className="login-container">
      <span>Sign in to YDO</span>
      <button
        onClick={handleGoogleLogin}
        disabled={isLoading}
        className="google-btn"
      >
        {isLoading ? "Signing in..." : "Sign in with Google"}
      </button>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Login;

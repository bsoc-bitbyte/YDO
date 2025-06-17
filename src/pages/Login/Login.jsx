import { useState, useEffect } from "react";
import "./Login.css";
import Button from "../../components/button/Button";
import { checkLoginStatus } from "../../utils/checkLoginStatus";
import HeartAnimation from "./HeartAnimation";
import backgroundImage from  '../../assets/login/bg-login.png'
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
    window.location = `${API_BASE_URL}/`;
  };

  if (loggedIn) {
    window.location.href = "/";
  }
  return (
    <>
    <div className="container" style={{backgroundImage:`url(${backgroundImage})`}}>
      <div className="login-container">
        <HeartAnimation />
        <div className="login-card">
          <div className="Title">YOU DESERVE ONE</div>
          <div className="google-button" onClick={handleGoogleLogin}>
            <div className="text">LOGIN WITH</div>
           <div className="wrapper"><div className="google-icon"></div></div> 
          </div>   
          <p className="confidential-text">
            All your information is confidential
            <br />
            Even the developers can’t access your data.read{" "}how
          </p>
        </div>
      </div>
    </div>
    </>
  );
};

export default Login;

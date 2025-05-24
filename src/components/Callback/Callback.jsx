import React, { useEffect } from "react";

const API_BASE_URL = import.meta.env.VITE_API_URL || "";

const Callback = () => {
    useEffect(() => {
    const handleAuthCallback = () => {
      const hash = window.location.hash;
      if (hash && hash.includes('access_token')) {
        const params = new URLSearchParams(hash.substring(1));
        const accessToken = params.get('access_token');
        const refreshToken = params.get('refresh_token');
        
        if (accessToken) {
          localStorage.setItem('access_token', accessToken);
          if (refreshToken) {
            localStorage.setItem('refresh_token', refreshToken);
          }
          
          window.history.replaceState({}, document.title, window.location.pathname);
          
        }
      }
      
    };
    handleAuthCallback();
    window.location.href = "/";
    }, []); 

    return null;
};

export default Callback;
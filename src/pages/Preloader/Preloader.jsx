
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Preloader.css";
import YDOAnimation from "../../components/Animation/Animation";
import { checkLoginStatus } from "../../utils/checkLoginStatus";
import { fetchUserData } from "../../utils/fetchUserData";
import HeartSVG from "../../assets/Preloader/Heart.svg";
import PreloaderBG from "../../assets/Preloader/background.png";

const API_BASE_URL = import.meta.env.VITE_API_URL || "";

const Preloader = () => {
    const [userData, setUserData] = useState(null);
    const [showAnimation, setShowAnimation] = useState(true);
    const [showContent, setShowContent] = useState(false);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const run = async () => {
            const isLoggedIn = await checkLoginStatus(API_BASE_URL);
            if (!isLoggedIn) {
                navigate('/login');
                return;
            }
            const user = await fetchUserData(API_BASE_URL);
            if (!user) {
                navigate('/login');
                return;
            }
            setUserData(user);
            // Wait for animation to finish
            setTimeout(() => {
                setShowAnimation(false);
                setShowContent(true);
                // Start loading bar animation
                setTimeout(() => {
                    const progressInterval = setInterval(() => {
                        setLoadingProgress(prev => {
                            if (prev >= 100) {
                                clearInterval(progressInterval);
                                setTimeout(() => {
                                    navigate('/home');
                                }, 1000);
                                return 100;
                            }
                            return prev + 2; //5 seconds
                        });
                    }, 100);
                }, 1200);
            }, 3000);
        };
        run();
    }, [navigate]);

    return (
        <div className="preloader_page">
            <div
                className="gradient_background"style={{background: `url(${PreloaderBG}) center center/cover no-repeat`,}}></div>
            <div className="preloader_content">
                {showAnimation && (
                    <div className="preloader_animation">
                        <YDOAnimation />
                    </div>
                )}
                {showContent && (
                    <div className="content_section">
                        <div className="welcome_message">
                            <h2 className="username_display">
                                Hi {userData && (
                                    (userData.name && userData.name.split(' ')[0]) ||
                                    (userData.full_name && userData.full_name.split(' ')[0]) ||
                                    (userData.email && userData.email.split('@')[0])
                                )}!!!
                            </h2>
                            <p className="welcome_text">Welcome to YDO - your heart's <br/>got Wi-Fi now...</p>
                        </div>
                    </div>
                )}
                <div className="loading_bar_container">
                    <div className="loading_bar_track">
                        <div className="loading_bar_fill" style={{ width: showAnimation ? "0%" : `${loadingProgress}%` }}>
                            <div className="heart_icon_moving" style={{ left: '100%' }}>
                                <img src={HeartSVG} style={{ width: '100%', height: '100%' }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Preloader;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Preloader.css";
import YDOAnimation from "../../components/Animation/Animation";
import { checkLoginStatus } from "../../utils/checkLoginStatus";
import { fetchUserData } from "../../utils/fetchUserData";

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
            <div className="gradient_background"></div>
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
                        <div
                            className="loading_bar_fill"
                            style={{ width: showAnimation ? "0%" : `${loadingProgress}%` }}
                        >
                            <div
                                className="heart_icon_moving"
                                style={{ left: '100%' }}
                            >
                                <svg width="100%" height="100%" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20.5193 14.6723C28.6817 14.6153 31.7358 22.9288 31.7358 22.9288C31.7358 22.9288 34.633 14.5695 42.8489 14.5116C49.0222 14.4667 56.1011 19.3063 53.5798 30.4476C51.0584 41.5888 31.957 55.5903 31.957 55.5903C31.957 55.5903 12.7159 41.8741 10.0329 30.77C7.34983 19.6659 13.8501 14.7223 20.5193 14.6723Z" fill="#731D1C"/>
                                    <path d="M44.1174 15.3319C37.7135 15.3814 34.5848 22.2874 33.5779 25.0872C33.4326 25.4856 32.8804 25.5059 32.7085 25.1152L31.7539 22.9318C33.0422 18.6993 36.6464 14.5586 42.8528 14.5116C45.418 14.4929 48.1439 15.3248 50.2685 17.0973C48.3942 15.8826 46.1993 15.315 44.1174 15.3319ZM20.5192 14.6701C22.4878 14.6566 24.2888 15.0711 25.6933 15.9244C24.7102 15.5529 23.4911 15.4797 22.2837 15.4874C16.2481 15.5323 10.8799 20.149 13.394 30.7105C15.5515 39.7782 27.8639 50.7077 31.6309 54.8859C31.87 55.1511 31.9552 55.5818 31.9552 55.5818C31.9552 55.5818 12.7141 41.8656 10.0311 30.7615C7.34973 19.6637 13.8375 14.7234 20.5192 14.6701Z" fill="#541312"/>
                                    <path d="M49.2283 20.3751C47.8168 18.6434 45.3155 17.2205 43.2143 18.8956C42.0763 19.8019 42.5913 21.6361 43.6205 22.4052C45.1201 23.5254 46.4201 24.2017 47.3402 25.9677C47.8933 27.029 48.2286 28.1924 48.402 29.3789C48.4705 29.8478 49.0848 29.9586 49.3133 29.5447C50.8633 26.7405 51.2829 22.9021 49.2283 20.3751ZM26.8635 24.204C27.5176 24.2001 27.9776 23.5595 27.7321 22.9567C27.2811 21.8377 26.7007 20.7501 26.002 19.785C24.9728 18.3641 23.0256 17.5419 21.7989 18.4182C20.5442 19.3155 20.7236 21.0884 21.6125 21.9355C23.5285 23.7571 25.9214 24.2112 26.8635 24.204Z" fill="#C35756"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Preloader;

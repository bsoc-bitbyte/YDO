import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";
import backgroundImage from "../../assets/Landingpage/bg.jpg";
import YDOAnimation from "../../components/Animation/Animation";
import line from "../../assets/Landingpage/Line.svg";
import { checkLoginStatus } from "../../utils/checkLoginStatus";

function Landingpage(){
    const navigate = useNavigate();
    const API_BASE_URL = import.meta.env.VITE_API_URL || "";

    const handleGetStarted = async () => {
        // Check if user is already logged in
        const isLoggedIn = await checkLoginStatus(API_BASE_URL);
         if (isLoggedIn) {
            navigate("/preloader");
        } else {
            navigate("/login");
        }
    };

    return (        
        <div className="landing_page" style={{ backgroundImage: `url(${backgroundImage})` }}>            
            <div className="landing_page_content">
                <div className="animation">
                    <YDOAnimation />
                </div>                
                <p>
                    <div className="line">
                        <img src={line} alt="line" className="Line" />
                    </div>
                    <div className="tagline">YOU DESERVE ONE</div>
                    <div className="line">
                        <img src={line} alt="line" className="Line" />
                    </div>
                </p>
                <button className="get_started_btn" onClick={handleGetStarted}>
                    GET STARTED
                </button>
            </div>
            <p className="landing_page_footer">
                    IIITDMJ'S EXCLUSIVE DATING APPLICATION
            </p>
        </div>
    )
}
export default Landingpage;
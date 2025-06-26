import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";
import backgroundImage from "../../assets/Landingpage/bg.jpg";
import YDOAnimation from "../../components/Animation/animation";
import line from "../../assets/Landingpage/Line.svg";

function Landingpage(){
    const navigate = useNavigate();

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
                <button className="get_started_btn" onClick={() => navigate("/login")}>
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
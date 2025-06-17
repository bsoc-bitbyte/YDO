import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./LandingPage.css";
import backgroundImage from "../../assets/Landingpage/bg.jpg";
import arrowImage from "../../assets/Landingpage/arrowImage.svg";
import line from "../../assets/Landingpage/Line.svg";

function Landingpage(){
    const navigate = useNavigate();
    return (
        <div className="landing_page" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className="landing_page_content">
                <div id="ydo">
                    <div className="logo_y">Y</div>
                    <div className="logo_d">D</div>
                    <div className="image__wrapper">
                        <img src={arrowImage} alt="arrow" className="arrow" />
                    </div>
                    <div className="logo_o">O</div>
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
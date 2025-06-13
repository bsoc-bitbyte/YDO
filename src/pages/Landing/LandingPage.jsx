import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";
import backgroundImage from "../../assets/Landingpage/bg.jpg";
import arrowImage from "../../assets/Landingpage/arrowImage.svg";
import line from "../../assets/Landingpage/line.svg";

function Landingpage(){
    const navigate = useNavigate();

    return (
        <div className="landingPage" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className="landingPageContent">
                <div id="ydo">
                    <div className="y">Y</div>
                    <div className="d">D</div>
                    <div className="image__wrapper">
                        <img src={arrowImage} alt="arrow" className="arrow" />
                    </div>
                    <div className="o">O</div>
                </div>
                <p>
                    <div className="line">
                        <img src={line} alt="line" className="Line" />
                    </div>
                    <div className="tagLine">YOU DESERVE ONE</div>
                    <div className="line">
                        <img src={line} alt="line" className="Line" />
                    </div>
                </p>
                <button className="get-started-btn" onClick={() => navigate("/login")}>
                    GET STARTED
                </button>
            </div>
            <p className="landingPageFooter">
                    IIITDMJ'S EXCLUSIVE DATING APPLICATION
            </p>
        </div>
    )
}
export default Landingpage;

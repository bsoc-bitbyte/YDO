import React from 'react';
import './404.css';
import backgroundImage from '/src/assets/404bg.png'; // Import the image
import arrowImage from '/src/assets/404arrow.svg'; // Import the arrow too


function NotFound() {
    return (
        <div
            className="notfound"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <div className="notfound__content">
                <div className="title__container">
                       <h1 className="title">
                           4
                           <span className="notfound__zero">
                                0
                               <div className="image__wrapper">
                                   <img src={arrowImage} alt="arrow" className="notfound__arrow" />
                               </div>
                           </span>
                           4
                       </h1>
                </div>

                <p className="notfound__tagline">
                    We couldn’t find this page,<br />
                    Yet we can surely find you someone.
                </p>

                <div className="notfound__emoji">😉</div>
                <a href="/" className="notfound__button">Go looking <span className="eyes">👀</span></a>

                <p className="notfound__footer">
                    IIITDMJ'S EXCLUSIVE DATING APPLICATION
                </p>
            </div>
        </div>
    );
}

export default NotFound;
import { useState } from "react";
import { Link } from "react-router-dom";
import Account from "../../assets/mobile-nav/Account.png";
import YDOlogo from "../../assets/mobile-nav/YDOlogo.png";
import hamburger from "../../assets/mobile-nav/hamburger.svg";
import close from "../../assets/mobile-nav/close.svg";
import "./MobNav.css";

export default function MobNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const toggleMenu = () => {
    if (isOpen) {
      setIsClosing(true);
      setTimeout(() => {
        setIsOpen(false);
        setIsClosing(false);
      }, 800);
    } else {
      setIsOpen(true);
    }
  };

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <div className="navbar">
        <div className="navbar__menu" onClick={toggleMenu}>
          <img src={hamburger} alt="menu" />
        </div>
        <div className="navbar__logo">
          <img src={YDOlogo} alt="logo" />
        </div>
        <div className="navbar__account">
          <img src={Account} alt="account" />
        </div>
      </div>

      {isOpen && (
        <div
          className={`overlay ${!isClosing ? "" : "closed"}`}
          onClick={toggleMenu}
        >
          <div
            className={`drawer ${!isClosing ? "" : "closed"}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="drawer__close" onClick={toggleMenu}>
              <img src={close} alt="close" />
            </div>
            <div className="drawer__items">
              <Link to="/home" onClick={closeMenu}>
                <p className="drawer__text">Home</p>
              </Link>
              <Link to="/choice" onClick={closeMenu}>
                <p className="drawer__text">Choice</p>
              </Link>
              <Link to="/matched" onClick={closeMenu}>
                <p className="drawer__text">Matched</p>
              </Link>
              <Link to="/profile" onClick={closeMenu}>
                <p className="drawer__text">Profile</p>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

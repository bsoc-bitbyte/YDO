import React, { useEffect, useState } from "react";
import './ToastContent.css';
import heartLeftIcon from '../../assets/Toast/Like/heart_left.svg';
import heartRightIcon from '../../assets/Toast/Like/heart_right.svg';

const ToastTemplate = {
  like: {
    className: 'like-toast',
    leftIcon: heartLeftIcon,
    rightIcon: heartRightIcon,
    message: "Crush initiated. Let’s hope it’s mutual ✨",
  }
  // more templates will be added here
}

const ToastContent = ({ type }) => {
  const [showIcons, setShowIcons] = useState(false);
  const ToastTemplates = ToastTemplate[type];

  useEffect(() => {
    const timer = setTimeout(() => setShowIcons(true), 400);
    return () => clearTimeout(timer);
  }, []);

 return (
  <div className={`toast-content ${ToastTemplates.className}`}>
    {showIcons && <img src={ToastTemplates.leftIcon} className="toast-icon left" />}
    <p className="toast-message">{ToastTemplates.message}</p>
    {showIcons && <img src={ToastTemplates.rightIcon} className="toast-icon right" />}
  </div>
);

};

export default ToastContent;

import React from 'react'
import {NavLink} from 'react-router'
import './Navbar.css'
import YDO from '../../assets/navbar-images/YDO-logo.png'
import notification from '../../assets/navbar-images/notification-YDO.png'
import Account from '../../assets/navbar-images/Account-YDO.png'
import Settings from '../../assets/navbar-images/Settings-YDO.png'

import { useEffect,useState } from 'react'
import { checkLoginStatus } from '../../utils/checkLoginStatus.js'
const API_BASE_URL = import.meta.env.VITE_API_URL || "";

function Navbar() {
const [isAuthenticated,setIsAuthenticated]=useState(false);
useEffect(()=>{
  const checkAuth=async ()=>{
    const loggedIn=await checkLoginStatus(API_BASE_URL);
    setIsAuthenticated(loggedIn);
  };
  checkAuth();
},[])
if(!isAuthenticated) return null;
  return (
    <>
      <svg width="0" height="0">
        <filter id="redShadow">
        <feDropShadow dx="-0.75" dy="-0.75" stdDeviation="0" floodColor="#731D1C" />
        <feDropShadow dx="0.75" dy="-0.75" stdDeviation="0" floodColor="#731D1C" />
        <feDropShadow dx="-0.75" dy="0.75" stdDeviation="0" floodColor="#731D1C" />
        <feDropShadow dx="0.75" dy="0.75" stdDeviation="0" floodColor="#731D1C" />
        <feDropShadow dx="0" dy="-0.75" stdDeviation="0" floodColor="#731D1C" />
        <feDropShadow dx="0" dy="0.75" stdDeviation="0" floodColor="#731D1C" />
        <feDropShadow dx="-0.75" dy="0" stdDeviation="0" floodColor="#731D1C" />
        <feDropShadow dx="0.75" dy="0" stdDeviation="0" floodColor="#731D1C" />
        <feDropShadow dx="-0.75" dy="0.75" stdDeviation="0" floodColor="#731D1C" />
        <feDropShadow dx="0.75" dy="0.75" stdDeviation="0" floodColor="#731D1C" />
        </filter>
      </svg>
      <svg width="0" height="0">
        <filter id="pinkShadow">
        <feDropShadow dx="-0.5" dy="-0.5" stdDeviation="0" floodColor="#D96C81" />
        <feDropShadow dx="0.5" dy="-0.5" stdDeviation="0" floodColor="#D96C81" />
        <feDropShadow dx="-0.5" dy="0.5" stdDeviation="0" floodColor="#D96C81" />
        <feDropShadow dx="0.5" dy="0.5" stdDeviation="0" floodColor="#D96C81" />
        <feDropShadow dx="0" dy="-0.5" stdDeviation="0" floodColor="#D96C81" />
        <feDropShadow dx="0" dy="0.5" stdDeviation="0" floodColor="#D96C81" />
        <feDropShadow dx="-0.5" dy="0" stdDeviation="0" floodColor="#D96C81" />
        <feDropShadow dx="0.5" dy="0" stdDeviation="0" floodColor="#D96C81" />
        <feDropShadow dx="-0.5" dy="0.5" stdDeviation="0" floodColor="#D96C81" />
        <feDropShadow dx="0.5" dy="0.5" stdDeviation="0" floodColor="#D96C81" />
        </filter>
      </svg>
      <div className="nav-header">
        <nav className="nav-middle">
          <img className="YDO-logo" src={YDO} alt='YDO-logo'/>
          <NavLink style={{textDecoration:'none'}} to={'/'} className={({isActive})=>`content ${isActive? "active":""}`}>
          Home
          </NavLink>
          <NavLink style={{textDecoration:'none'}} to={'/login'} className={({isActive})=>`content ${isActive? "active":""}`}>
          Search
          </NavLink>
          <NavLink style={{textDecoration:'none'}} to={'/choice'} className={({isActive})=>`content ${isActive? "active":""}`}>
          Choice
          </NavLink>
          <NavLink style={{textDecoration:'none'}} to={'/matched'} className={({isActive})=>`content ${isActive? "active":""}`}>
          Matched
          </NavLink>
          <div className="tool-set">
          <NavLink style={{textDecoration:'none'}} to={'/notifications'} className={({isActive})=>`notifications-YDO ${isActive? "active":""}`}>
          <img src={notification} alt='notifications'/>
          </NavLink>
          <NavLink style={{textDecoration:'none'}} to={'/settings'} className={({isActive})=>`Settings-YDO ${isActive? "active":""}`}>
          <img src={Settings} alt='settings'/>
          </NavLink>
          <NavLink style={{textDecoration:'none'}} to={'/account'} className={({isActive})=>`Account-YDO ${isActive? "active":""}`}>
          <img src={Account} alt='account'/>
          </NavLink>  
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;

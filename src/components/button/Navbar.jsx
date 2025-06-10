import React from 'react'
import {NavLink} from 'react-router'
import './Navbar.css'

function Navbar() {

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
          <img className="YDO-logo" src='/navbar-images/YDO-logo.png'/>
          <NavLink style={{textDecoration:'none'}} to={'/'} className={({isActive})=>`content ${isActive? "active":""}`}>
          Home
          </NavLink>
          <NavLink style={{textDecoration:'none'}} to={'/search'} className={({isActive})=>`content ${isActive? "active":""}`}>
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
          <img src="/navbar-images/notification-YDO.png" alt='notifications'/>
          </NavLink>
          <NavLink style={{textDecoration:'none'}} to={'/settings'} className={({isActive})=>`Settings-YDO ${isActive? "active":""}`}>
          <img src="/navbar-images/Settings-YDO.png" alt='settings'/>
          </NavLink>
          <NavLink style={{textDecoration:'none'}} to={'/account'} className={({isActive})=>`Account-YDO ${isActive? "active":""}`}>
          <img src="/navbar-images/Account-YDO.png" alt='account'/>
          </NavLink>  
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;

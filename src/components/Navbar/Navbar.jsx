import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router'
import {NavLink} from 'react-router'
import './App.css'
import YDO from '../../assets/navbar-images/YDO-logo.png'
import notification from '../../assets/navbar-images/notification-YDO.png'
import Account from '../../assets/navbar-images/Account-YDO.png'
import Settings from '../../assets/navbar-images/Settings-YDO.png'

function App() {
  const Reference=useRef(null)
  const location=useLocation()
  const [initialLoad,setInitialLoad]=useState(true)

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  useEffect(() => {
    const OnResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener('resize', OnResize);
    OnResize();

    return () => window.removeEventListener('resize', OnResize);
  }, []);

  useEffect(()=>{
   const activePage=document.querySelector('.active') 
   const indicator=Reference.current;
   if(activePage && indicator){
      const { offsetLeft, offsetWidth } = activePage;
      indicator.style.transform =`translateX(${offsetLeft}px)`;
      indicator.style.width = `${offsetWidth}px`;   
   }
   if(initialLoad){
      indicator.style.transition='none';
      indicator.style.opacity='1';
      setInitialLoad(false)
   }
   else{
    indicator.style.transition='transform 0.8s ease,width 0.8s ease';
   }
  },[location.pathname,windowSize])

  return (
    <>
      <svg width="0" height="0">
        <filter id="pinkShadow">
        <feDropShadow dx="-0.25" dy="-0.25" stdDeviation="0" floodColor="#D96C81" />
        <feDropShadow dx="0.25" dy="-0.25" stdDeviation="0" floodColor="#D96C81" />
        <feDropShadow dx="-0.25" dy="0.25" stdDeviation="0" floodColor="#D96C81" />
        <feDropShadow dx="0.25" dy="0.25" stdDeviation="0" floodColor="#D96C81" />
        <feDropShadow dx="0" dy="-0.25" stdDeviation="0" floodColor="#D96C81" />
        <feDropShadow dx="0" dy="0.25" stdDeviation="0" floodColor="#D96C81" />
        <feDropShadow dx="-0.25" dy="0" stdDeviation="0" floodColor="#D96C81" />
        <feDropShadow dx="0.25" dy="0" stdDeviation="0" floodColor="#D96C81" />
        <feDropShadow dx="-0.25" dy="0.25" stdDeviation="0" floodColor="#D96C81" />
        <feDropShadow dx="0.25" dy="0.25" stdDeviation="0" floodColor="#D96C81" />
        </filter>
      </svg>
      <nav>
      <div className="nav-header">
        <div className='nav-main'>
          <div className='nav-left'>
            <img className="YDO-logo" src={YDO}/>
          </div>
          <div className='nav-middle'>
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
          </div>
          <div className='nav-right'>
            <div className="tool-set">
              <button className='btn'style={{height:'100%'}} >
              <img className='notifications-YDO' src={notification} />
              </button>
              <button className='btn' style={{height:'100%'}} >
              <img className='Settings-YDO' src={Settings} />
              </button>
              <NavLink style={{textDecoration:'none',display:'flex',alignItems:'center',height:'100%'}} to={'/profile'} className={({isActive})=>`${isActive? "active":""}`}>
              <img className='Account-YDO' src={Account} style={{padding:'0.8px'}} />
              </NavLink>  
            </div>  
          </div>
          <div className='nav-indicator' ref={Reference}/>                     
        </div>      
      </div>
      </nav>
    </>
  )
}

export default App

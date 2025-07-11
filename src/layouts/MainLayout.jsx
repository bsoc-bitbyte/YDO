import {Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

const MainLayout=()=>{
    const location=useLocation();
    const hideNavBarRoutes=["/","/login"];
    const showNavBar= !hideNavBarRoutes.includes(location.pathname)
    return(
        <>
        {showNavBar && <Navbar/>}
        <Outlet/>
        </>
    );
};

export default MainLayout;
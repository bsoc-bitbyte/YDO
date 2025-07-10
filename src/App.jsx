import "./App.css";
import Landingpage from "./pages/Landing/LandingPage.jsx";
import Login from "./pages/Login/Login";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Callback from "./pages/Callback/Callback";
import NotFound from "./pages/404/404";
import MainLayout from "./layouts/MainLayout.jsx";
import Preloader from "./pages/Preloader/Preloader";
import ProfilePage from "./pages/Profile/ProfilePage.jsx";
import PrivateRoutesWrapper from "./components/ProtectedRoutes/PrivateRoutesWrapper.jsx";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Landingpage />} />
         <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoutesWrapper />}>
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<ProfilePage />} />
          
        </Route>
        <Route path="/callback" element={<Callback />} />
      </Route>
      <Route path="/preloader" element={<Preloader />} />
      


      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;

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
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <>
      <ToastContainer />
    
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Landingpage />} />
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoutesWrapper />}>
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/preloader" element={<Preloader />} />
            {/* Add more protected routes here */}
          </Route>
          <Route path="/callback" element={<Callback />} />
        </Route>
      

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;

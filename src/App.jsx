import "./App.css";
import Landingpage from "./pages/Landing/LandingPage.jsx";
import Login from "./pages/Login/Login";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Callback from "./pages/Callback/Callback";
import Preloader from "./pages/Preloader/Preloader";
import NotFound from './pages/404/404'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/callback" element={<Callback />} />
        <Route path="/preloader" element={<Preloader />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App;

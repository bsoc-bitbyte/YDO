import "./App.css";
import Landingpage from "./pages/Landing/LandingPage.jsx";
import Login from "./pages/Login/Login";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Callback from "./pages/Callback/Callback";
import NotFound from './pages/404/404';
import PrivateRoute from "./components/ProtectedRoutes/ProtectedRoutes.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landingpage />} />
      <Route path="/home" element={<PrivateRoute><Home/></PrivateRoute>}/>
      <Route path="/login" element={<Login />} />
      <Route path="/callback" element={<Callback />} />
      <Route path="*" element={<NotFound />} />
     </Routes>
  )
}

export default App;

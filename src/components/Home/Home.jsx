import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../lib/button/Button";

const Home = () => {
  const [userData, setUserData] = React.useState(null);

  const API_BASE_URL = import.meta.env.VITE_API_URL || "";

  const nav = useNavigate();

  const redirectToLogin = () => {
    nav("/login");
  };

  React.useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) return;

        const response = await fetch(`${API_BASE_URL}/auth/user`, {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setUserData(userData);
        } else {
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    fetchUserData();
  }, []);

  return (
    <>
      <h1>YDO💜</h1>
      {userData && userData.avatar_url && (
        <div>
          <img src={userData.avatar_url} alt="Profile" className="avatar" />
          <p>
            Welcome{" "}
            <em>
              <strong>{userData?.name}!</strong>
            </em>
          </p>
        </div>
      )}
      {!userData && <p>Please login to continue.</p>}

      {/* <button onClick={redirectToLogin}> Get Started!</button> */}
      <Button onClick={redirectToLogin} variant="primary">
        Get Started!
      </Button>
    </>
  );
};

export default Home;

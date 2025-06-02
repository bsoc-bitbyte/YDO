import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import { fetchUserData } from "../../utils/fetchUserData";

const Home = () => {
  const [userData, setUserData] = React.useState(null);

  const API_BASE_URL = import.meta.env.VITE_API_URL || "";

  const nav = useNavigate();

  const redirectToLogin = () => {
    nav("/login");
  };

 React.useEffect(() => {
    const loadUser = async () => {
      const data = await fetchUserData(API_BASE_URL);
      if (data) {
        setUserData(data);
      }
    };

    loadUser();
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

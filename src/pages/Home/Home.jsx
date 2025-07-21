import Navbar from "../../components/Navbar/Navbar.jsx";
import "./Home.css";
import refreshIcon from "../../assets/Home/refreshIcon.png";
import heartIcon from "../../assets/Home/heartIcon.png";
import pass from "../../assets/Home/pass.png";
import EmblaCarousel from "../../components/infinite-carousel/EmblaCarousel";
import "@fontsource/sacramento";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="main">
        <div className="text-wrapper">
          <h2 className="text">Ready to make someone blush today?🥰</h2>
        </div>
        <EmblaCarousel />
        <div className="icons">
          <div className="pass-icon">
            <img src={pass} alt="pass" className="pass-icon__image" />
          </div>
          <div className="smash">
            <img src={heartIcon} alt="smash" className="smash__image" />
          </div>
          <div className="refresh">
            <img src={refreshIcon} alt="refresh" className="refresh__image" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

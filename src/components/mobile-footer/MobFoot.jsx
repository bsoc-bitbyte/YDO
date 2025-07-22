import { Link } from "react-router-dom";
import notifications from "../../assets/mobile-nav/notifications.png";
import settings from "../../assets/mobile-nav/settings.png";
import search from "../../assets/mobile-nav/search.png";
import "./MobFoot.css";

export default function MobFoot() {
  return (
    <>
      <div className="mobile-footer">
        <div className="mobile-footer__notifications">
          <Link to="/notifications">
            <img src={notifications} alt="notificaations" />
          </Link>
        </div>
        <div className="mobile-footer__settings">
          <Link to="/settings">
            <img src={settings} alt="settings" />
          </Link>
        </div>
        <div className="mobile-footer__search">
          <Link to="/search">
            <img src={search} alt="search" />
          </Link>
        </div>
      </div>
    </>
  );
}

import imgNotifications from "../../assets/img/notifications.svg";
import imgAvatar from "../../assets/img/avatar.png";
import imgLogo from "../../assets/img/logo.svg";
import "./Header.scss";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <div className="header__container container">
        <div className="header__logo">
          <img src={imgLogo} width="80" height="26" alt="avatar" />
        </div>

        <nav className="header__menu">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `header__menu-link ${isActive ? "active" : ""}`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/events"
            className={({ isActive }) =>
              `header__menu-link ${isActive ? "active" : ""}`
            }
          >
            Events
          </NavLink>
          <NavLink
            to="/help"
            className={({ isActive }) =>
              `header__menu-link ${isActive ? "active" : ""}`
            }
          >
            Help
          </NavLink>
        </nav>

        <div className="header__icons">
          <NavLink to="/notifications">
            <img
              src={imgNotifications}
              width={24}
              height={24}
              alt="notification"
            />
          </NavLink>
          <NavLink to="/profile">
            <img src={imgAvatar} width={32} height={32} alt="avatar" />
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;

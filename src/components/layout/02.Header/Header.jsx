// ASSETS
import MenuIcon from "@mui/icons-material/Menu";
import ProfilePic from "../../assets/ProfilePic.avif";

// STYLES
import "./Header.scss";

// LIBRARIES
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// MISC

// COMPONENTS

// CONFIGURATION
const Header = (props) => {
  // PROPERTIES
  const { toggleSidemenu } = props;

  // API REQUESTS

  // LIBRARY CONSTANTS
  const location = useLocation();

  // STATE CONSTANTS
  const [pageTitle, setPageTitle] = useState("");

  // LIFE CYCLE
  useEffect(() => {
    if (location.pathname === "/") {
      setPageTitle("Dashboard Page");
    } else if (location.pathname === "/projects") {
      setPageTitle("Projects Page");
    } else if (location.pathname === "/persons") {
      setPageTitle("Persons Page");
    } else if (location.pathname === "/about") {
      setPageTitle("About");
    }
  }, [location]);

  // EVENT HANDLERS
  return (
    <div className="header-container">
      <div className="header-left">
        <div className="header-hamburger" onClick={toggleSidemenu}>
          <MenuIcon />
        </div>
        <h2 className="header-logo">PM APP</h2>
      </div>

      <div className="header-page-title">{pageTitle}</div>

      <div className="header-usercard">
        <span className="header-username">{localStorage.getItem("Username")}</span>

        <img src={ProfilePic} className="header-image" alt="Profile" />
      </div>
    </div>
  );
};

export default Header;

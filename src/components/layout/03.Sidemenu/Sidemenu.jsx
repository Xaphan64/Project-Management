// ASSETS
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import InfoIcon from "@mui/icons-material/Info";

// STYLES
import "./Sidemenu.scss";

// LIBRARIES
import { useLocation, useNavigate } from "react-router-dom";

// MISC

// COMPONENTS
import CustomButton from "../../atoms/CustomButton/CustomButton";
import { useEffect } from "react";

// CONFIGURATION
const Sidemenu = (props) => {
  // PROPERTIES
  const sidemenu = props.sidemenu;

  // API REQUESTS

  // LIBRARY CONSTANTS
  const navigate = useNavigate();
  const location = useLocation();

  // STATE CONSTANTS

  // LIFE CYCLE
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleLogout();
    }, 8.64e7);

    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line
  }, []);

  // EVENT HANDLERS
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="sidemenu-container">
      <div className={sidemenu ? "sidemenu-buttons close" : "sidemenu-buttons"}>
        <CustomButton
          type="button"
          className={location.pathname === "/" ? "active" : "inactive"}
          onClick={() => navigate("/")}
        >
          <DashboardIcon />
          <span>Dashboard</span>
        </CustomButton>
        <CustomButton
          type="button"
          className={location.pathname === "/projects" ? "active" : "inactive"}
          onClick={() => navigate("/projects")}
        >
          <AccountTreeIcon />
          <span>Projects</span>
        </CustomButton>
        <CustomButton
          type="button"
          className={location.pathname === "/persons" ? "active" : "inactive"}
          onClick={() => navigate("/persons")}
        >
          <PersonIcon />
          <span>Persons</span>
        </CustomButton>

        <CustomButton
          type="button"
          className={location.pathname === "/about" ? "active" : "inactive"}
          onClick={() => navigate("/about")}
        >
          <InfoIcon />
          <span>About</span>
        </CustomButton>

        <CustomButton type="button" className="logout-button" onClick={handleLogout}>
          <LogoutIcon />
          <span>Logout</span>
        </CustomButton>
      </div>

      <div className={sidemenu ? "sidemenu-logout close" : "sidemenu-logout"}>
        <CustomButton type="button" onClick={handleLogout}>
          <LogoutIcon />
          <span>Logout</span>
        </CustomButton>
      </div>
    </div>
  );
};

export default Sidemenu;

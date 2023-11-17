// ASSETS

// STYLES
import "./Layout.scss";

// LIBRARIES
import { useState } from "react";
import { Outlet } from "react-router-dom";

// MISC

// COMPONENTS
import Header from "../02.Header/Header";
import Sidemenu from "../03.Sidemenu/Sidemenu";

// CONFIGURATION
const Layout = () => {
  // PROPERTIES

  // API REQUESTS

  // LIBRARY CONSTANTS
  const isMobile = window.matchMedia("(max-width: 1280px)")?.matches;

  // STATE CONSTANTS
  const [sidemenu, setSidemenu] = useState(false);

  // LIFE CYCLE

  // EVENT HANDLERS
  const toggleSidemenu = () => {
    setSidemenu(!sidemenu);
  };

  return (
    <div className="layout-container">
      <Header toggleSidemenu={toggleSidemenu} />

      <div className="body-container">
        {!isMobile && (
          <div className="side-menu">
            <Sidemenu sidemenu={sidemenu} />
          </div>
        )}

        <div className="outlet">
          <Outlet />
        </div>

        {isMobile && (
          <div className="side-menu">
            <Sidemenu sidemenu={sidemenu} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Layout;

// ASSETS

// STYLES

// LIBRARIES
import { Navigate, Outlet } from "react-router-dom";

// MISC

// COMPONENTS

// CONFIGURATION
const PrivateRoutes = () => {
  // PROPERTIES

  // API REQUESTS

  // LIBRARY CONSTANTS
  // const authenticationToken = localStorage.getItem("token");

  const authenticationToken = sessionStorage.getItem("token");

  // STATE CONSTANTS

  // LIFE CYCLE

  // EVENT HANDLERS
  return authenticationToken ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;

// ASSETS

// STYLES

// LIBRARIES
import { Link } from "react-router-dom";

// MISC

// COMPONENTS

// CONFIGURATION
const ErrorPage = () => {
  // PROPERTIES

  // API REQUESTS

  // LIBRARY CONSTANTS

  // STATE CONSTANTS

  // LIFE CYCLE

  // EVENT HANDLERS

  return (
    <div>
      <h1 style={{ display: "flex", justifyContent: "center", color: "lightblue" }}>Error! This page does not exist</h1>

      <h2 style={{ display: "flex", justifyContent: "center", color: "lightblue", gap: 10 }}>
        Do you want to go to <Link to="/">Dashboard page</Link>?
      </h2>
    </div>
  );
};

export default ErrorPage;

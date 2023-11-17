// ASSETS

// STYLES

// LIBRARIES
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// MISC

// COMPONENTS
import Login from "./components/pages/02.Login/Login";
import Register from "./components/pages/01.Register/Register";
import Dashboard from "./components/pages/03.Dashboard/Dashboard";
import PrivateRoutes from "./components/config/PrivateRoutes";
import ErrorPage from "./components/config/ErrorPage";
import Layout from "./components/layout/01.Layout/Layout";
import Projects from "./components/pages/04.Projects/Projects";
import Persons from "./components/pages/05.Persons/Persons";
import About from "./components/pages/06.About/About";

// CONFIGURATION
const AppRoutes = () => {
  // PROPERTIES

  // API REQUESTS

  // LIBRARY CONSTANTS

  // STATE CONSTANTS

  // LIFE CYCLE

  // EVENT HANDLERS
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<PrivateRoutes />}>
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/persons" element={<Persons />} />
            <Route path="/about" element={<About />} />
          </Route>
        </Route>

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;

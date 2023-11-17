// ASSETS
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import HttpsIcon from "@mui/icons-material/Https";

// STYLES
import "./Login.scss";
// LIBRARIES
import { useState } from "react";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";

// MISC
import { useForm } from "../../hooks/useForm";

// COMPONENTS
import CustomButton from "../../atoms/CustomButton/CustomButton";
import CustomInput from "../../atoms/CustomInput/CustomInput";

// CONFIGURATION
const Login = () => {
  // PROPERTIES

  // API REQUESTS

  // LIBRARY CONSTANTS
  const navigate = useNavigate();

  // STATE CONSTANTS
  const [loginError, setLoginError] = useState("");
  const { inputValues, handleInputChange } = useForm({
    email: "",
    password: "",
  });

  // LIFE CYCLE

  // EVENT HANDLERS
  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      inputValues.email === localStorage.getItem("Email", inputValues.email) &&
      inputValues.password === localStorage.getItem("Password", inputValues.password)
    ) {
      navigate("/");
      sessionStorage.setItem("token", nanoid());
    } else {
      setLoginError("Wrong email or password");
    }
  };
  return (
    <div className="login-container">
      <h1 className="login-header">Login Page</h1>

      <form onSubmit={handleSubmit}>
        <div className="login-input">
          <MailOutlineIcon />
          <CustomInput
            type="email"
            name="email"
            value={inputValues.email}
            onChange={handleInputChange}
            placeholder="Email"
          />
        </div>

        <div className="login-input">
          <HttpsIcon />
          <CustomInput
            type="password"
            name="password"
            value={inputValues.password}
            onChange={handleInputChange}
            placeholder="Password"
          />
        </div>

        <CustomButton type="submit">Login</CustomButton>

        <CustomButton type="button" onClick={() => navigate("/register")}>
          No account? Register
        </CustomButton>
      </form>

      {loginError && <span className="error-message">{loginError}</span>}
    </div>
  );
};

export default Login;

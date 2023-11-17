// ASSETS
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import HttpsIcon from "@mui/icons-material/Https";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

// STYLES
import "./Register.scss";

// LIBRARIES
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// MISC
import { useForm } from "../../hooks/useForm";

// COMPONENTS
import CustomButton from "../../atoms/CustomButton/CustomButton";
import CustomInput from "../../atoms/CustomInput/CustomInput";

// CONFIGURATION
const Register = () => {
  // PROPERTIES

  // API REQUESTS

  // LIBRARY CONSTANTS
  const navigate = useNavigate();

  // STATE CONSTANTS
  const [matchError, setMatchError] = useState("");
  const [strongPassError, setStrongPassError] = useState("");
  const { inputValues, handleInputChange } = useForm({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // LIFE CYCLE

  // EVENT HANDLERS

  const handleSubmit = (event) => {
    event.preventDefault();

    //password match
    if (inputValues.password === inputValues.confirmPassword) {
      localStorage.setItem("Password", inputValues.password);
      localStorage.setItem("Confirm Password", inputValues.confirmPassword);
    } else {
      setMatchError("Password and confirm password does not match");
    }

    //strong password (regex)
    if (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(inputValues.password, inputValues.confirmPassword)) {
      localStorage.setItem("Username", inputValues.username);
      localStorage.setItem("Email", inputValues.email);
      setStrongPassError("");
    } else {
      setStrongPassError(
        "Password must be min 8 characters, and contain at least one uppercase letter, one lower case letter and a digit"
      );
    }

    //redirect to login
    if (
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(inputValues.password, inputValues.confirmPassword) &&
      inputValues.password === inputValues.confirmPassword
    ) {
      navigate("/login");
    } else {
      console.log("Something is wrong");
    }
    console.log("form submitted succesfully");
  };

  return (
    <div className="register-container">
      <h1 className="register-header">Register Page</h1>
      <form onSubmit={handleSubmit}>
        <div className="register-input">
          <PersonOutlineIcon />
          <CustomInput
            type="text"
            placeholder="Select your username"
            name="username"
            value={inputValues.username}
            onChange={handleInputChange}
          />
        </div>

        <div className="register-input">
          <MailOutlineIcon />
          <CustomInput
            type="email"
            placeholder="Select your email address"
            name="email"
            value={inputValues.email}
            onChange={handleInputChange}
          />
        </div>

        <div className="register-input">
          <HttpsIcon />
          <CustomInput
            type="password"
            placeholder="Select your password"
            name="password"
            value={inputValues.password}
            onChange={handleInputChange}
          />
        </div>

        <div className="register-input">
          <HttpsIcon />
          <CustomInput
            type="password"
            placeholder="Confirm your password"
            name="confirmPassword"
            value={inputValues.confirmPassword}
            onChange={handleInputChange}
          />
        </div>

        <CustomButton type="submit">Create Account</CustomButton>

        <CustomButton type="button" onClick={() => navigate("/login")}>
          Already have an account?
        </CustomButton>
      </form>
      <div className="bottom-error">
        {matchError && <span className="error-message">{matchError}</span>}
        {strongPassError && <span className="error-message">{strongPassError}</span>}
      </div>
    </div>
  );
};

export default Register;

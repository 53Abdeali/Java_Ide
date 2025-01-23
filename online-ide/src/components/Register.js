import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import javaz from "./Javaz.png";
import seven from "./7.png";
import "./Stylesheets/Login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError("");
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/auth/register", {
        username,
        password,
      });
      alert("User Registered Successfully!");
    } catch (err) {
      alert("Some error occured...");
      console.error("Error Registering User", err);
    }
  };

  return (
    <div>
      <div className="images">
        <img className="login-img" src={javaz} alt="Login" />
      </div>
      <div className="setup">
        <div className="login">
          <div className="login-heads">
            <h2>Welcome to JavaZ</h2>
            <h4>Please sign-up to your account and start the coding.</h4>
          </div>
          <div className="log-form">
            <form className="log-form" onSubmit={handleRegister}>
              <label htmlFor="Login">Username</label>
              <div className="username">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              </div>
              <label htmlFor="Login">Password</label>
              <div className="pass-cont">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <FontAwesomeIcon
                    className="icon"
                    icon={showPassword ? faEyeSlash : faEye}
                  />
                </span>
              </div>

              <label htmlFor="Login">Confirm Password</label>
              <div className="conf-cont">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <span
                  className="toggle-password"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <FontAwesomeIcon
                    className="icon"
                    icon={showConfirmPassword ? faEyeSlash : faEye}
                  />
                </span>

                {error && <p className="error-message">{error}</p>}
              </div>
              <button type="submit">Register</button>
              <Link className="to-reg" to="/login">
                {" "}
                Already have an Account? Login
              </Link>
            </form>
          </div>
        </div>
        <div className="img-vec">
          <img className="vector" src={seven} alt="Vector" />
        </div>
      </div>
    </div>
  );
}

export default Register;

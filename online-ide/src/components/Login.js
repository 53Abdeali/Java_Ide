import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import javaz from "./Javaz.png";
import seven from "./7.png";
import "./Stylesheets/Login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        {
          username: username.trim(),
          password: password.trim(),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Check response and handle token
      if (response.data.jwt) {
        console.log("Login successful, received token:", response.data.jwt);
        localStorage.setItem("token", response.data.jwt); // Save token
        alert("Login Successful!");
        navigate("/ide"); // Redirect to IDE page
      } else {
        console.error("Unexpected response:", response);
        alert("Invalid Credentials or Unexpected Response.");
      }
    } catch (err) {
      // Log error details for debugging
      console.error("Login Error:", err);
      if (err.response && err.response.status === 401) {
        alert("Invalid Credentials. Please try again.");
      } else {
        alert(
          "An error occurred during login. Please check the console for details."
        );
      }
    }
  };

  return (
    <div className="main-log">
      <div className="images">
        <img className="login-img" src={javaz} alt="Login" />
      </div>
      <div className="setup">
        <div className="img-vec">
          <img className="vector" src={seven} alt="Vector" />
        </div>
        <div className="login">
          <div className="login-heads">
            <h2>Welcome to JavaZ</h2>
            <h4>Please sign-in to your account and start the coding.</h4>
          </div>
          <div className="log-form">
            <form className="log-form" onSubmit={handleLogin}>
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
              <button type="submit">Login</button>
              <Link className="to-reg" to="/register">
                {" "}
                Don't have an account? Register
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

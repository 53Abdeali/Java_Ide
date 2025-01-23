import React from "react";
import { useNavigate } from "react-router-dom";
import "./Stylesheets/Ide.css";

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div>
      <button onClick={handleLogout} className="button">
        Logout
      </button>
    </div>
  );
}

export default Logout;

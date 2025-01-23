import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ component: Component }) => {
  const isAuthenticated = localStorage.getItem("token");

  if (!Component) {
    console.error("Component is undefined in PrivateRoute");
    return null;
  }

  return isAuthenticated ? <Component /> : <Navigate to="/login" />;
};

export default PrivateRoute;

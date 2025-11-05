import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (token) {
    // User already logged in → redirect to dashboard
    return <Navigate to="/dashboard" replace />;
  }

  // User not logged in → render the page
  return children;
};

export default PublicRoute;

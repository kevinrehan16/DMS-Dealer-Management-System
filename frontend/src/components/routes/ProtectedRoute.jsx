import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // or any auth check

  if (!token) {
    // User not logged in → redirect to login
    return <Navigate to="/" replace />;
  }

  // User logged in → render the page
  return children;
};

export default ProtectedRoute;

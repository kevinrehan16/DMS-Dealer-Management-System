import React from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext/AuthContext";
import { Spinner } from "react-bootstrap";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

// import "../../assets/css/Sidebar.css";
// import "../../assets/css/Topbar.css";
import "../../assets/css/AdminLayout.css";

export default function AdminLayout() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center vh-100 bg-light"
        style={{ flexDirection: "column" }}
      >
        <Spinner animation="border" variant="primary" role="status" />
        <h5 className="mt-3 text-secondary">Loading, please wait...</h5>
      </div>
    );
  }
  return (
    <div className="adminlayout-container">
      <Sidebar />
      <div className="main-content">
        <Topbar />
        <div className="adminlayout-body">
          {/* Your main content */}
          <Outlet />
        </div>
      </div>
    </div>
  );
}

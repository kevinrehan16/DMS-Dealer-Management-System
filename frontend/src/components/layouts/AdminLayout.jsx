import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
// import "../../assets/css/Sidebar.css";
// import "../../assets/css/Topbar.css";
import "../../assets/css/AdminLayout.css";

export default function AdminLayout() {
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

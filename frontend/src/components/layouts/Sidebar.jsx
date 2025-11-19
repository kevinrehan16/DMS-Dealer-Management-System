// src/components/layout/Sidebar.jsx
import React from "react";
import { Nav } from "react-bootstrap";
import { FaAppStore, FaChartPie, FaUser, FaFileAlt, FaCog, FaUserSecret } from "react-icons/fa";
import { useLocation, Link } from "react-router-dom";
import "../../assets/css/Sidebar.css";

export default function Sidebar() {
  const location = useLocation(); // get current URL path

  return (
    <div className="sidebar">
      <h3 className="sidebar-title"><FaAppStore /> DMS</h3>
      <Nav className="flex-column">
        <Nav.Link
          as={Link}
          to="/dashboard"
          className={`d-flex align-items-center gap-2 ${location.pathname === "/dashboard" ? "active" : ""}`}
        >
          <FaChartPie /> Dashboard
        </Nav.Link>
        <Nav.Link
          as={Link}
          to="/inquiry"
          className={`d-flex align-items-center gap-2 ${location.pathname === "/inquiry" ? "active" : ""}`}
        >
          <FaUser /> Inquiry
        </Nav.Link>
        <Nav.Link
          as={Link}
          to="/creditinvestigation"
          className={`d-flex align-items-center gap-2 ${location.pathname === "/creditinvestigation" ? "active" : ""}`}
        >
          <FaUserSecret /> Credit Investigation
        </Nav.Link>
        <Nav.Link
          as={Link}
          to="#"
          className={`d-flex align-items-center gap-2 ${location.pathname === "/reports" ? "active" : ""}`}
        >
         <FaFileAlt /> Reports
        </Nav.Link>
        <Nav.Link
          as={Link}
          to="#"
          className={`d-flex align-items-center gap-2 ${location.pathname.pathname === "/settings" ? "active" : ""}`}
        >
         <FaCog /> Settings
        </Nav.Link>
      </Nav>
    </div>
  );
}

// src/components/layout/Sidebar.jsx
import React from "react";
import { Nav } from "react-bootstrap";
import { FaAppStore } from "react-icons/fa";
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
          className={location.pathname === "/dashboard" ? "active" : ""}
        >
          Dashboard
        </Nav.Link>
        <Nav.Link
          as={Link}
          to="/inquiry"
          className={location.pathname === "/inquiry" ? "active" : ""}
        >
          Inquiry
        </Nav.Link>
        <Nav.Link
          as={Link}
          to="#"
          className={location.pathname === "/reports" ? "active" : ""}
        >
          Reports
        </Nav.Link>
        <Nav.Link
          as={Link}
          to="#"
          className={location.pathname === "/settings" ? "active" : ""}
        >
          Settings
        </Nav.Link>
      </Nav>
    </div>
  );
}

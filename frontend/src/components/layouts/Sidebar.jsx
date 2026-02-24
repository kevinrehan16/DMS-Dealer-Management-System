import React, { useState, useEffect } from "react";
import { Nav } from "react-bootstrap";
import { FaAppStore, FaChartPie, FaUser, FaFileAlt, FaCog, FaUserSecret, FaUserTie, FaChevronDown } from "react-icons/fa";
import { useLocation, Link } from "react-router-dom";
import "../../assets/css/Sidebar.css";
import { can } from "../../utils/permission";

export default function Sidebar() {
  const location = useLocation();
  const [settingsOpen, setSettingsOpen] = useState(false);

  // Determine active submenu from URL
  const activeSubMenu = location.pathname.includes("/settings/roles")
    ? "roles"
    : location.pathname.includes("/settings/permissions")
    ? "permissions"
    : "";

  // Open Settings if a submenu is active
  useEffect(() => {
    if (activeSubMenu) {
      setSettingsOpen(true);
    } else {
      setSettingsOpen(false);
    }
  }, [activeSubMenu]);

  const toggleSettings = () => setSettingsOpen(!settingsOpen);

  const isSettingsActive =
    location.pathname.startsWith("/settings") || activeSubMenu !== "";

  return (
    <div className="sidebar">
      <h3 className="sidebar-title"><FaAppStore /> DMS</h3>
      <Nav className="flex-column">
        {can('view dashboard') && (
          <Nav.Link
            as={Link}
            to="/dashboard"
            className={`d-flex align-items-center gap-2 ${location.pathname === "/dashboard" ? "active" : ""}`}
          >
            <FaChartPie /> Dashboard
          </Nav.Link>
        )}

        {can('view inquiry') && (
          <Nav.Link
            as={Link}
            to="/inquiry"
            className={`d-flex align-items-center gap-2 ${location.pathname === "/inquiry" ? "active" : ""}`}
          >
            <FaUser /> Inquiry
          </Nav.Link>
        )}

        {can('view investigation') && (
          <Nav.Link
            as={Link}
            to="/creditinvestigation"
            className={`d-flex align-items-center gap-2 ${location.pathname === "/creditinvestigation" ? "active" : ""}`}
          >
            <FaUserSecret /> Credit Investigation
          </Nav.Link>
        )}

        {can('view evaluation') && (
          <Nav.Link
            as={Link}
            to="/adminevaluation"
            className={`d-flex align-items-center gap-2 ${location.pathname === "/adminevaluation" ? "active" : ""}`}
          >
            <FaUserTie /> Admin Evaluation
          </Nav.Link>
        )}

        <Nav.Link
          as={Link}
          to="#"
          className={`d-flex align-items-center gap-2 ${location.pathname === "/reports" ? "active" : ""}`}
        >
          <FaFileAlt /> Reports
        </Nav.Link>

        {/* Settings Menu */}
        <div>
          <Nav.Link
            as={Link}
            to="#"
            onClick={toggleSettings}
            className={`d-flex align-items-center justify-content-between ${isSettingsActive ? "active" : ""}`}
          >
            <span className="d-flex align-items-center gap-2"><FaCog /> Settings</span>
            <FaChevronDown className={`settings-arrow ${settingsOpen ? "rotate" : ""}`} />
          </Nav.Link>

          {/* Submenu */}
          <div className={`submenu ${settingsOpen ? "open" : ""}`}>
            <Nav.Link
              as={Link}
              to="/settings/roles"
              className={`submenu-link ${activeSubMenu === "roles" ? "submenu-active" : ""}`}
            >
              Roles
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/settings/permissions"
              className={`submenu-link ${activeSubMenu === "permissions" ? "submenu-active" : ""}`}
            >
              Permissions
            </Nav.Link>
          </div>
        </div>
      </Nav>
    </div>
  );
}
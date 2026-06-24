import React, { useState, useEffect } from "react";
import { Nav, Image } from "react-bootstrap";
import { 
  FaAppStore, 
  FaChartPie, 
  FaUser, 
  FaFileAlt, 
  FaCog, 
  FaUserSecret, 
  FaUserTie, 
  FaChevronDown, 
  FaRegDotCircle, 
  FaCashRegister,
  FaWarehouse 
} from "react-icons/fa";
import { FaUsersGear } from "react-icons/fa6";
import { useLocation, Link } from "react-router-dom";
import "../../assets/css/Sidebar.css";
import { can } from "../../utils/permission";

export default function Sidebar() {
  const location = useLocation();

  // 1. Gagamit tayo ng iisang string state ('inventory', 'settings', o '' kapag sarado lahat)
  // Nakadepende ang initial state sa kung anong URL ang unang ni-load
  const [openMenu, setOpenMenu] = useState(() => {
    if (location.pathname.startsWith("/inventory")) return "inventory";
    if (location.pathname.startsWith("/settings")) return "settings";
    return "";
  });

  // 2. I-sync ang menu kapag nagbago ang URL (halimbawa: nag-back button ang user)
  useEffect(() => {
    if (location.pathname.startsWith("/inventory")) {
      setOpenMenu("inventory");
    } else if (location.pathname.startsWith("/settings")) {
      setOpenMenu("settings");
    } else {
      setOpenMenu(""); // Isara lahat kung nasa ibang page (e.g., Dashboard)
    }
  }, [location.pathname]);

  // 3. Toggle Function (Accordion Style)
  const toggleMenu = (menu) => {
    // Kung ang kinlick ay bukas na, isara (''). Kung iba, buksan yung bago.
    setOpenMenu((prev) => (prev === menu ? "" : menu));
  };

  // Check kung sino ang "Active" (Para kulay yellow/highlighted ang parent menu)
  const isInventoryActive = location.pathname.startsWith("/inventory");
  const isSettingsActive = location.pathname.startsWith("/settings");

  // Check kung sino ang "Open" (Para makita ang submenu dropdown)
  const isInventoryOpen = openMenu === "inventory";
  const isSettingsOpen = openMenu === "settings";

  return (
    <div className="sidebar">
      <h3 className="sidebar-title">
        <div className="d-flex align-items-center">
          <div 
            className="logo-circle-container" 
            style={{ 
              width: 35, 
              height: 35, 
              borderRadius: '50%', 
              overflow: 'hidden', 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#fff', 
              flexShrink: 0,
              boxShadow: '0 0 0 1px #343a40, 0 0 0 3px #343a40, 0 0 0 5px #ffc107' 
            }}
          >
            <Image 
                src="/dms.png" 
                width={35} 
                height={35} 
                alt="Logo" 
                style={{ 
                    width: '80%',      
                    height: '80%', 
                    objectFit: 'contain' 
                }} 
            />
          </div>
          <div className="ms-3">
            <div className="fw-bold text-white" style={{ fontSize: "0.9rem" }}>
              Dealer Management
            </div>

            <div className="fw-light" style={{ fontSize: "0.65rem", color: "#ffc107" }}>
              Enterprise Solutions
            </div>
          </div>
        </div>
      </h3>

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
          to="/cashier"
          className={`d-flex align-items-center gap-2 ${location.pathname === "/cashier" ? "active" : ""}`}
        >
          <FaCashRegister /> Cashier
        </Nav.Link>

        {/* --- INVENTORY MENU (Parent + Dropdown) --- */}
        <div>
          <Nav.Link
            as={Link}
            to="#"
            onClick={() => toggleMenu('inventory')}
            className={`d-flex align-items-center justify-content-between ${isInventoryActive ? "active" : ""}`}
          >
            <span className="d-flex align-items-center gap-2"><FaWarehouse /> Inventory</span>
            <FaChevronDown className={`settings-arrow ${isInventoryOpen ? "rotate" : ""}`} />
          </Nav.Link>

          {/* Inventory Submenu */}
          <div className={`submenu ${isInventoryOpen ? "open" : ""}`}>
            <Nav.Link
              as={Link}
              to="/inventory/unit-catalog"
              className={`submenu-link ${location.pathname === "/inventory/unit-catalog" ? "submenu-active" : ""} d-flex align-items-center gap-2`}
            >
              <FaRegDotCircle /> Unit Catalog
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/inventory/stock-units"
              className={`submenu-link ${location.pathname === "/inventory/stock-units" ? "submenu-active" : ""} d-flex align-items-center gap-2`}
            >
              <FaRegDotCircle /> Stock Units
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/inventory/stock-history"
              className={`submenu-link ${location.pathname === "/inventory/stock-history" ? "submenu-active" : ""} d-flex align-items-center gap-2`}
            >
              <FaRegDotCircle /> Stock History
            </Nav.Link>
          </div>
        </div>

        <Nav.Link
          as={Link}
          to="/users"
          className={`d-flex align-items-center gap-2 ${location.pathname === "/users" ? "active" : ""}`}
        >
          <FaUsersGear  /> Users
        </Nav.Link>

        <Nav.Link
          as={Link}
          to="/reports"
          className={`d-flex align-items-center gap-2 ${location.pathname === "/reports" ? "active" : ""}`}
        >
          <FaFileAlt /> Reports
        </Nav.Link>

        {/* --- SETTINGS MENU (Parent + Dropdown) --- */}
        <div>
          <Nav.Link
            as={Link}
            to="#"
            onClick={() => toggleMenu('settings')}
            className={`d-flex align-items-center justify-content-between ${isSettingsActive ? "active" : ""}`}
          >
            <span className="d-flex align-items-center gap-2"><FaCog /> Settings</span>
            <FaChevronDown className={`settings-arrow ${isSettingsOpen ? "rotate" : ""}`} />
          </Nav.Link>

          {/* Settings Submenu */}
          <div className={`submenu ${isSettingsOpen ? "open" : ""}`}>
            <Nav.Link
              as={Link}
              to="/settings/roles"
              className={`submenu-link ${location.pathname === "/settings/roles" ? "submenu-active" : ""} d-flex align-items-center gap-2`}
            >
              <FaRegDotCircle />  Roles
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/settings/permissions"
              className={`submenu-link ${location.pathname === "/settings/permissions" ? "submenu-active" : ""} d-flex align-items-center gap-2`}
            >
              <FaRegDotCircle /> Permissions
            </Nav.Link>
          </div>
        </div>

      </Nav>
    </div>
  );
}
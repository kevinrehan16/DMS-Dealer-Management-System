// src/components/layout/Topbar.jsx
import React from "react";
import { FaAlignJustify, FaSignOutAlt, FaKey } from "react-icons/fa";
import { Dropdown  } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext/AuthContext";
import "../../assets/css/Topbar.css";

export default function Topbar() {
  const navigate = useNavigate();

  const { user, loading } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("permissions");
    navigate("/");
  };

  return (
    <div className="topbar">
      <h5 className="topbar-title">
        <FaAlignJustify />
      </h5>

      <div className="topbar-right">
        <Dropdown align="end">
          <Dropdown.Toggle id="user-dropdown">
            {user?.firstName} {user?.lastName}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => navigate("/change-password")}>
              <FaKey /> Change Password
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleLogout}>
              <FaSignOutAlt /> Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
}

// src/components/layout/Topbar.jsx
import React from "react";
import { FaAlignJustify } from "react-icons/fa";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../../assets/css/Topbar.css";

export default function Topbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="topbar">
      <h5 className="topbar-title">
        <FaAlignJustify />
      </h5>
      <Button variant="danger" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
}

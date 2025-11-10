// src/components/layout/Topbar.jsx
import React from "react";
import { FaAlignJustify, FaSignOutAlt } from "react-icons/fa";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext/AuthContext";
import "../../assets/css/Topbar.css";

export default function Topbar() {
  const navigate = useNavigate();

  const { user, loading } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="topbar">
      <h5 className="topbar-title">
        <FaAlignJustify />
      </h5>
      <div className="d-flex gap-2 align-items-center justify-content-center">
        {user?.firstName}, {user?.lastName}
        <Button variant="danger" onClick={handleLogout} className="text-center">
          <FaSignOutAlt className="my-1"/>
        </Button>
      </div>
    </div>
  );
}

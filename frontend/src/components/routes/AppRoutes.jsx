// src/components/routes/AppRoutes.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../../pages/auth/Login";
import Signup from "../../pages/auth/Signup";

import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../../pages/dashboard/Dashboard";
import Inquiry from "../../pages/inquiry/Inquiry";

import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route
          path="/"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />

        {/* Protected routes inside AdminLayout */}
        <Route
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/inquiry" element={<Inquiry />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

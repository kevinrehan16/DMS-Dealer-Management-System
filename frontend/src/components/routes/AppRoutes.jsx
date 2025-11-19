// src/components/routes/AppRoutes.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../../pages/auth/Login";
import Signup from "../../pages/auth/Signup";

import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../../pages/dashboard/Dashboard";

import { InquiryProvider } from '../../context/InquiryContext/InquiryContext';
import { AuthProvider } from "../../context/AuthContext/AuthContext";
import CreditInvestigation from "../../pages/CreditInvestigation/CreditInvestigation";
import Inquiry from "../../pages/Inquiry/Inquiry";

import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <AuthProvider>
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
            <Route path="/inquiry" 
              element={
                        <InquiryProvider>
                          <Inquiry />
                        </InquiryProvider>
                      } />
            <Route path="/creditinvestigation" 
              element={
                        <InquiryProvider>
                          <CreditInvestigation />
                        </InquiryProvider>
                      } />                      
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

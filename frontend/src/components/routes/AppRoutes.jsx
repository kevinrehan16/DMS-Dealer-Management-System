// src/components/routes/AppRoutes.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../../pages/auth/Login";
import Signup from "../../pages/auth/Signup";

import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../../pages/dashboard/Dashboard";

import { InquiryProvider } from '../../context/InquiryContext/InquiryContext';
import { AuthProvider } from "../../context/AuthContext/AuthContext";
import { NotificationProvider } from "../../context/NotificationContext";

import Inquiry from "../../pages/Inquiry/Inquiry";
import AdminEvaluation from "../../pages/AdminEvaluation/AdminEvaluation";
import CreditInvestigation from "../../pages/CreditInvestigation/CreditInvestigation";
import Users from "../../pages/Users/Users";
import Roles from "../../pages/Settings/Roles";

import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <NotificationProvider>
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
                          <Inquiry />
                        } />
              <Route path="/creditinvestigation" 
                element={
                          <InquiryProvider>
                            <CreditInvestigation />
                          </InquiryProvider>
                        } />
              <Route path="/adminevaluation" 
                element={
                          <InquiryProvider>
                            <AdminEvaluation />
                          </InquiryProvider>
                        } />
              <Route path="/users" element={<Users />} />
              <Route path="/settings/roles" element={<Roles />} />
            </Route>
          </Routes>
        </AuthProvider>
      </NotificationProvider>
    </BrowserRouter>
  );
}

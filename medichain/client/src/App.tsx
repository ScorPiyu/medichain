import { Toaster } from '../src/components/ui/toaster'
import { Toaster as Sonner } from '../src/components/ui/sonner';
import { TooltipProvider } from '../src/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// import { AuthProvider } from "./contexts/AuthContext";
import React, { useState, useEffect } from "react";

// Layouts
import MainLayout from "./layouts/MainLayout";
import DashboardLayout from "./layouts/DashboardLayout";

// Public Pages
import LandingPage from "./pages/LandingPage";
import DoctorsList from "./pages/DoctorsList";
import DoctorProfile from "./pages/DoctorProfile";
import EmergencyConsult from "./pages/EmergencyConsult";
import AboutUs from "./pages/AboutUs";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Success from './pages/success';
import Failure from './pages/failure';

// Dashboard Pages
import PatientDashboard from "./pages/dashboard/PatientDashboard";
import DoctorDashboard from "./pages/dashboard/DoctorDashboard";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import Appointments from "./pages/dashboard/Appointments";
import HealthRecords from "./pages/dashboard/HealthRecords";
import ProfileSettings from "./pages/dashboard/ProfileSettings";
import { AuthProvider } from './contexts/AuthContext';

const App = () => {
  // Create a client inside the component
  const [queryClient] = useState(() => new QueryClient());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial load
    // localStorage.setItem("loggedIn", "");
    const timer = setTimeout(() => {
      setIsLoading(false);
      console.log("App initialized and ready");
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-t-4 border-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
    <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<MainLayout />}>
                <Route index element={<LandingPage />} />
                <Route path="doctors" element={<DoctorsList />} />
                <Route path="doctors/:id" element={<DoctorProfile />} />
                <Route path="emergency" element={<EmergencyConsult />} />
                <Route path="about" element={<AboutUs />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
              </Route>
              <Route path = "/success" element = {<Success />}/>
              <Route path = "/success/:details" element = {<Success />}/>

              <Route path = "/failure" element = {<Failure />}/>

              {/* Dashboard Routes - Protected */}
              <Route path="/dashboard" element={<DashboardLayout />}>
                <Route path="patient" element={<PatientDashboard />} />
                <Route path="doctor" element={<DoctorDashboard />} />
                <Route path="admin" element={<AdminDashboard />} />
                <Route path="appointments" element={<Appointments />} />

                <Route path="health-records" element={<HealthRecords />} />
                <Route path="settings" element={<ProfileSettings />} />
                {/* Redirect empty dashboard path to patient dashboard */}
                <Route index element={<Navigate to="/dashboard/patient" replace />} />
              </Route>
              <Route path="/emergency/:id/:info" element={<EmergencyConsult />} />

              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </TooltipProvider>
          </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
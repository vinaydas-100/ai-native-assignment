import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import AuthGuard from '../features/auth/components/AuthGuard';
import NavigationMenu from '../features/navigation/components/NavigationMenu';
import SpeedDial from '../features/speed-dial/components/SpeedDial';
import LoginForm from '../features/auth/components/LoginForm';
import RegisterForm from '../features/auth/components/RegisterForm';
import LandingPage from '../features/landing/components/LandingPage';
import HomePage from '../features/home/components/HomePage';
import EmergencyContactsPage from '../features/emergency-contacts/components/EmergencyContactsPage';
import LiveLocationPage from '../features/location/components/LiveLocationPage';
import SafetyTipsPage from '../features/safety-tips/components/SafetyTipsPage';
import AboutPage from '../features/about/components/AboutPage';

const ProtectedLayout: React.FC = () => {
  return (
    <AuthGuard>
      <div className="min-h-screen flex flex-col">
        <NavigationMenu />
        <div className="flex-1 px-4 py-6 md:px-8 lg:px-16">
          <Outlet />
        </div>
        <SpeedDial />
      </div>
    </AuthGuard>
  );
};

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/login"
        element={
          <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
            <LoginForm />
          </div>
        }
      />
      <Route
        path="/register"
        element={
          <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
            <RegisterForm />
          </div>
        }
      />

      {/* Protected routes */}
      <Route element={<ProtectedLayout />}>
        <Route path="/dashboard" element={<HomePage />} />
        <Route path="/emergency-contacts" element={<EmergencyContactsPage />} />
        <Route path="/live-location" element={<LiveLocationPage />} />
        <Route path="/safety-tips" element={<SafetyTipsPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;

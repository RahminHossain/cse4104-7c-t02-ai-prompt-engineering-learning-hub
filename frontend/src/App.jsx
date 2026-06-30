import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

import Dashboard from './pages/Dashboard';
import ProfilePage from './pages/ProfilePage';
import ModulesPage from './pages/ModulesPage';
import ModuleDetailsPage from './pages/ModuleDetailsPage';
import Playground from './pages/Playground';
import Challenges from './pages/Challenges';
import Marketplace from './pages/Marketplace';

import AdminLayout from './layouts/AdminLayout';
import AdminPanel from './pages/AdminPanel';

import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Router>
      <Routes>
        {/* Public Routes under MainLayout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />

          {/* Protected Routes for Students */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/modules" element={<ModulesPage />} />
            <Route path="/modules/:id" element={<ModuleDetailsPage />} />
            <Route path="/playground" element={<Playground />} />
            <Route path="/challenges" element={<Challenges />} />
            <Route path="/marketplace" element={<Marketplace />} />
          </Route>
        </Route>

        {/* Protected Routes for Admins (Using AdminLayout) */}
        <Route element={<AdminRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<AdminPanel />} />
          </Route>
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      </Router>
    </>
  );
}

export default App;

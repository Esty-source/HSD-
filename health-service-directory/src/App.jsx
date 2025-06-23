import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/layout/Layout';
import MobileNavigation from './components/responsive/MobileNavigation';
import QRCodeAccess from './components/responsive/QRCodeAccess';
import AdminLogin from './pages/AdminLogin';
import MobileProfile from './pages/MobileProfile';
import LoadingSpinner from './components/common/LoadingSpinner';

// Lazy load components
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Doctors = lazy(() => import('./pages/Doctors'));
const Appointments = lazy(() => import('./pages/Appointments'));
const Profile = lazy(() => import('./pages/Profile'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Telemedicine = lazy(() => import('./pages/Telemedicine'));
const Pharmacies = lazy(() => import('./pages/Pharmacies'));
const Resources = lazy(() => import('./pages/Resources'));
const FindDoctors = lazy(() => import('./pages/FindDoctors'));
const Contact = lazy(() => import('./pages/Contact'));
const SimpleTest = lazy(() => import('./pages/SimpleTest'));

function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/telemedicine" element={<Telemedicine />} />
        <Route path="/pharmacies" element={<Pharmacies />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/find-doctors" element={<FindDoctors />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/simple-test" element={<SimpleTest />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Suspense fallback={<LoadingSpinner />}>
          <AppRoutes />
        </Suspense>
        
        {/* Mobile components */}
        <MobileNavigation />
        <QRCodeAccess />
        
        {/* Toast notifications */}
        <Toaster 
          position="top-center" 
          toastOptions={{
            style: {
              background: '#363636',
              color: '#fff',
              maxWidth: '90vw',
              width: 'auto',
              padding: '12px 16px',
              borderRadius: '8px',
            }
          }}
        />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

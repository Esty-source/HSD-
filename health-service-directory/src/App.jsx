import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/layout/Layout';
import { ViewportProvider } from './components/responsive/ViewportProvider';
import { AuthProvider } from './context/AuthContext';
import { NotificationsProvider } from './context/NotificationsContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import MobileNavigation from './components/responsive/MobileNavigation';
import QRCodeAccess from './components/responsive/QRCodeAccess';

// Loading spinner component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

// Lazy load key components
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Auth = lazy(() => import('./pages/Auth'));
const DoctorSearch = lazy(() => import('./pages/DoctorSearch'));
const Pharmacies = lazy(() => import('./pages/Pharmacies'));
const Telemedicine = lazy(() => import('./pages/Telemedicine'));
const HealthRecords = lazy(() => import('./pages/HealthRecords'));
const Notifications = lazy(() => import('./pages/Notifications'));
const Appointments = lazy(() => import('./pages/Appointments'));
const Resources = lazy(() => import('./pages/Resources'));
const ResourceDetail = lazy(() => import('./pages/ResourceDetail'));

// Simple test pages
const SimpleTest = lazy(() => import('./pages/SimpleTest'));
const SimpleResources = lazy(() => import('./pages/SimpleResources'));
const SimpleAppointments = lazy(() => import('./pages/SimpleAppointments'));
const SupabaseCheck = lazy(() => import('./pages/SupabaseCheck'));
const RunMigration = lazy(() => import('./utils/runMigration'));

// Dashboard pages
const PatientDashboard = lazy(() => import('./pages/dashboard/PatientDashboard'));
const DoctorDashboard = lazy(() => import('./pages/dashboard/DoctorDashboard'));
const AdminDashboard = lazy(() => import('./pages/dashboard/AdminDashboard'));

function App() {
  return (
    <ViewportProvider>
      <AuthProvider>
        <NotificationsProvider>
          <BrowserRouter>
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route element={<Layout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/doctors" element={<DoctorSearch />} />
                  <Route path="/pharmacies" element={<Pharmacies />} />
                  <Route path="/telemedicine" element={<Telemedicine />} />
                  <Route path="/health-records" element={<HealthRecords />} />
                  <Route path="/notifications" element={<Notifications />} />
                  <Route path="/appointments" element={<Appointments />} />
                  <Route path="/resources" element={<Resources />} />
                  <Route path="/resources/:resourceId" element={<ResourceDetail />} />
                  
                  {/* Simple mobile-optimized pages */}
                  <Route path="/simple" element={<SimpleTest />} />
                  <Route path="/simple-resources" element={<SimpleResources />} />
                  <Route path="/simple-appointments" element={<SimpleAppointments />} />
                  
                  {/* Database check page */}
                  <Route path="/supabase-check" element={<SupabaseCheck />} />
                  <Route path="/run-migration" element={<RunMigration />} />
                  
                  {/* Dashboard routes */}
                  <Route path="/dashboard/patient" element={
                    <ProtectedRoute allowedRoles={['patient']}>
                      <PatientDashboard />
                    </ProtectedRoute>
                  } />
                  <Route path="/dashboard/doctor" element={
                    <ProtectedRoute allowedRoles={['doctor']}>
                      <DoctorDashboard />
                    </ProtectedRoute>
                  } />
                  <Route path="/dashboard/admin" element={
                    <ProtectedRoute allowedRoles={['admin']}>
                      <AdminDashboard />
                    </ProtectedRoute>
                  } />
                  
                  {/* Catch-all route */}
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
              
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
            </Suspense>
          </BrowserRouter>
        </NotificationsProvider>
      </AuthProvider>
    </ViewportProvider>
  );
}

export default App;

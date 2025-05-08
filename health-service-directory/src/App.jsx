import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, createRoutesFromElements, createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/layout/Layout';
import { NotificationsProvider } from './context/NotificationsContext';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { ViewportProvider } from './components/responsive/ViewportProvider';
import MobileNavigation from './components/responsive/MobileNavigation';
import QRCodeAccess from './components/responsive/QRCodeAccess';
import SimpleMobileView from './components/responsive/SimpleMobileView';
import ExpoQRCode from './components/responsive/ExpoQRCode';

// Lazy load components
const Home = lazy(() => import('./pages/Home'));
const DoctorSearch = lazy(() => import('./pages/DoctorSearch'));
const Pharmacies = lazy(() => import('./pages/Pharmacies'));
const Emergency = lazy(() => import('./pages/Emergency'));
const Profile = lazy(() => import('./pages/Profile'));
const Appointments = lazy(() => import('./pages/Appointments'));
const Telemedicine = lazy(() => import('./pages/Telemedicine'));
const HealthRecords = lazy(() => import('./pages/HealthRecords'));
const HealthResources = lazy(() => import('./pages/HealthResources'));
const Notifications = lazy(() => import('./pages/Notifications'));
const About = lazy(() => import('./pages/About'));
const MobileTest = lazy(() => import('./pages/MobileTest'));
const MobileDebug = lazy(() => import('./pages/MobileDebug'));
const Contact = lazy(() => import('./pages/Contact'));
const Support = lazy(() => import('./pages/Support'));
const Auth = lazy(() => import('./pages/Auth'));
const AdminAccess = lazy(() => import('./pages/AdminAccess')); // Direct admin access page
const DirectAdminAccess = lazy(() => import('./pages/DirectAdminAccess')); // Force admin access page
const PatientDashboard = lazy(() => import('./pages/dashboard/PatientDashboard'));
const DoctorDashboard = lazy(() => import('./pages/dashboard/DoctorDashboard'));
const AdminDashboard = lazy(() => import('./pages/dashboard/AdminDashboard'));
const NotFound = lazy(() => import('./pages/NotFound'));
const AuthCallback = lazy(() => import('./pages/AuthCallback'));

// Loading spinner component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

// Create router with future flags enabled
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path="/auth" element={<Auth />} />
      <Route path="/admin-login" element={<Auth />} />
      <Route path="/admin-access" element={<AdminAccess />} />
      <Route path="/direct-admin" element={<DirectAdminAccess />} />
      <Route path="/auth-callback" element={<AuthCallback />} />
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/pharmacies" element={<Pharmacies />} />
      <Route path="/appointments" element={<Appointments />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/doctors" element={<DoctorSearch />} />
      <Route path="/emergency" element={<Emergency />} />
      <Route path="/telemedicine" element={<Telemedicine />} />
      <Route path="/health-records" element={<HealthRecords />} />
      <Route path="/resources" element={<HealthResources />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/support" element={<Support />} />
      <Route path="/mobile-test" element={<SimpleMobileView />} />
      <Route path="/test" element={<MobileTest />} />
      <Route path="/debug" element={<MobileDebug />} />
      <Route path="/expo-qr" element={<ExpoQRCode />} />
      <Route path="/dashboard/patient" element={<ProtectedRoute allowedRoles={['patient']}><PatientDashboard /></ProtectedRoute>} />
      <Route path="/dashboard/doctor" element={<ProtectedRoute allowedRoles={['doctor']}><DoctorDashboard /></ProtectedRoute>} />
      <Route path="/dashboard/admin/*" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
      <Route path="/dashboard/admin" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
      <Route path="*" element={<NotFound />} />
    </Route>
  ),
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
      v7_normalizeFormMethod: true,
      v7_useRevert: true,
      v7_useLoaderData: true,
      v7_useActionData: true,
      v7_useRouteLoaderData: true,
      v7_useRouteActionData: true,
      v7_routeLoaderData: true,
      v7_routeActionData: true,
    }
  }
);

function App() {
  return (
    <ViewportProvider>
      <AuthProvider>
        <NotificationsProvider>
          <Suspense fallback={<LoadingSpinner />}>
            <RouterProvider router={router} />
            <MobileNavigation />
            <QRCodeAccess />
            <Toaster 
              position="top-center" 
              toastOptions={{
                // Mobile-friendly toast styling
                className: '',
                style: {
                  maxWidth: '90vw',
                  padding: '12px',
                  borderRadius: '8px',
                  fontSize: '14px'
                },
                // Different durations based on toast type
                duration: 3000,
                success: {
                  duration: 2000,
                  style: {
                    background: '#10B981',
                    color: 'white'
                  }
                },
                error: {
                  duration: 4000,
                  style: {
                    background: '#EF4444',
                    color: 'white'
                  }
                }
              }}
            />
          </Suspense>
        </NotificationsProvider>
      </AuthProvider>
    </ViewportProvider>
  );
}

export default App;

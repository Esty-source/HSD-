import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, createRoutesFromElements, createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/layout/Layout';
import { NotificationsProvider } from './context/NotificationsContext';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';

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
const Contact = lazy(() => import('./pages/Contact'));
const Support = lazy(() => import('./pages/Support'));
const Auth = lazy(() => import('./pages/Auth'));
const PatientDashboard = lazy(() => import('./pages/dashboard/PatientDashboard'));
const DoctorDashboard = lazy(() => import('./pages/dashboard/DoctorDashboard'));
const AdminDashboard = lazy(() => import('./pages/dashboard/AdminDashboard'));
const NotFound = lazy(() => import('./pages/NotFound'));

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
      <Route path="/dashboard/patient" element={<ProtectedRoute allowedRoles={['patient']}><PatientDashboard /></ProtectedRoute>} />
      <Route path="/dashboard/doctor" element={<ProtectedRoute allowedRoles={['doctor']}><DoctorDashboard /></ProtectedRoute>} />
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
    <AuthProvider>
      <NotificationsProvider>
        <Suspense fallback={<LoadingSpinner />}>
          <RouterProvider router={router} />
          <Toaster position="top-right" />
        </Suspense>
      </NotificationsProvider>
    </AuthProvider>
  );
}

export default App;

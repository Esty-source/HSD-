import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import { NotificationsProvider } from './context/NotificationsContext';

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
const Auth = lazy(() => import('./pages/Auth'));
const PatientDashboard = lazy(() => import('./pages/dashboard/PatientDashboard'));

// Loading spinner component
const LoadingSpinner = () => (
  <div className="flex h-screen items-center justify-center">
    <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
  </div>
);

function App() {
  return (
    <Router>
      <NotificationsProvider>
        <Layout>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/pharmacies" element={<Pharmacies />} />
              <Route path="/appointments" element={<Appointments />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/doctors" element={<DoctorSearch />} />
              <Route path="/emergency" element={<Emergency />} />
              <Route path="/telemedicine" element={<Telemedicine />} />
              <Route path="/health-records" element={<HealthRecords />} />
              <Route path="/resources" element={<HealthResources />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/dashboard/patient" element={<PatientDashboard />} />
            </Routes>
          </Suspense>
        </Layout>
      </NotificationsProvider>
    </Router>
  );
}

export default App;

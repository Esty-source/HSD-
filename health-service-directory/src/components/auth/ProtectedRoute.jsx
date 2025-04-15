import { Navigate, useLocation } from 'react-router-dom';

export default function ProtectedRoute({ children, allowedRoles }) {
  const location = useLocation();
  const token = localStorage.getItem('token');
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');

  if (!token) {
    // Redirect to auth page if no token
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // Check if user's role is allowed for this route
  if (!allowedRoles.includes(userData.role)) {
    // If not allowed, redirect to their appropriate dashboard
    if (userData.role === 'doctor') {
      return <Navigate to="/dashboard/doctor" replace />;
    } else if (userData.role === 'patient') {
      return <Navigate to="/dashboard/patient" replace />;
    }
    // If role is not recognized, redirect to auth
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return children;
} 
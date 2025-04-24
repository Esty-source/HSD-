import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function ProtectedRoute({ children, allowedRoles }) {
  const location = useLocation();
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    // Redirect to auth page if not authenticated
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // Check if user's role is allowed for this route
  if (!allowedRoles.includes(user?.role)) {
    // If not allowed, redirect to their appropriate dashboard
    if (user?.role === 'doctor') {
      return <Navigate to="/dashboard/doctor" replace />;
    } else if (user?.role === 'patient') {
      return <Navigate to="/dashboard/patient" replace />;
    }
    // If role is not recognized, redirect to auth
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return children;
}
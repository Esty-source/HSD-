import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function ProtectedRoute({ children, allowedRoles }) {
  const location = useLocation();
  const { isAuthenticated, user, loading } = useAuth();
  
  console.log('ProtectedRoute - Auth state:', { isAuthenticated, user, allowedRoles, loading });

  // If still loading, show a loading indicator
  if (loading) {
    console.log('Auth state is loading...');
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    console.log('Not authenticated, redirecting to auth');
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }
  
  // If user object doesn't exist, redirect to auth
  if (!user) {
    console.log('User missing, redirecting to auth');
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }
  
  // If user has no role, try to get it from localStorage directly
  if (!user.role) {
    try {
      console.log('Role missing, checking localStorage');
      const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
      if (storedUser && storedUser.role) {
        console.log(`Found role in localStorage: ${storedUser.role}`);
        // Update the user object with the role from localStorage
        user.role = storedUser.role;
      } else {
        console.log('No role found in localStorage, redirecting to auth');
        return <Navigate to="/auth" state={{ from: location }} replace />;
      }
    } catch (error) {
      console.error('Error parsing user from localStorage:', error);
      return <Navigate to="/auth" state={{ from: location }} replace />;
    }
  }

  // Special case for admin dashboard - if trying to access admin dashboard, ensure admin role
  const isAdminDashboard = location.pathname.includes('/dashboard/admin');
  if (isAdminDashboard && user.role !== 'admin') {
    console.log('Trying to access admin dashboard without admin role, redirecting to admin-access');
    return <Navigate to="/admin-access" replace />;
  }

  // Check if user's role is allowed for this route
  const hasAccess = allowedRoles.includes(user.role);
  console.log(`Access check: ${hasAccess ? 'Allowed' : 'Denied'} for role ${user.role}`);
  
  if (!hasAccess) {
    // If not allowed, redirect to their appropriate dashboard based on role
    const dashboardRoutes = {
      'admin': '/dashboard/admin',
      'doctor': '/dashboard/doctor',
      'patient': '/dashboard/patient'
    };
    
    const redirectPath = dashboardRoutes[user.role] || '/auth';
    console.log(`Redirecting to ${redirectPath} based on role ${user.role}`);
    return <Navigate to={redirectPath} replace />;
  }

  console.log('Access granted, rendering protected content');
  return children;
}
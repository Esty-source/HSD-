import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function ProtectedRoute({ children, allowedRoles }) {
  // WARNING: This disables all protection for testing purposes only!
  // Restore the original logic after testing.
  return children;
}
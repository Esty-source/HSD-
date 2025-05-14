import { useViewport } from '../components/responsive/ViewportProvider';
import MobileAdminDashboard from './MobileAdminDashboard';
import AdminDashboardDesktop from './dashboard/AdminDashboard';

export default function AdminDashboard() {
  const { isMobile } = useViewport();
  return isMobile ? <MobileAdminDashboard /> : <AdminDashboardDesktop />;
} 
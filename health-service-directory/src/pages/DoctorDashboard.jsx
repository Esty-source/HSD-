import { useViewport } from '../components/responsive/ViewportProvider';
import MobileDoctorDashboard from './MobileDoctorDashboard';
import DoctorDashboardDesktop from './dashboard/DoctorDashboard';

export default function DoctorDashboard() {
  const { isMobile } = useViewport();
  return isMobile ? <MobileDoctorDashboard /> : <DoctorDashboardDesktop />;
} 
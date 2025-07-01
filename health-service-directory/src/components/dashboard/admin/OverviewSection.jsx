import React, { useState, useEffect } from 'react';
import OverviewMetricsSection from './OverviewMetricsSection';
import ActivityFeedSection from './ActivityFeedSection';
import QuickActionsSection from './QuickActionsSection';
import SystemStatusSection from './SystemStatusSection';
import { 
  UserGroupIcon,
  UserCircleIcon,
  ClipboardDocumentListIcon, 
  CurrencyDollarIcon,
  BellAlertIcon
} from '@heroicons/react/24/outline';

// Mock data source instead of backend
export default function OverviewSection({ onTabChange }) {
  const [metrics, setMetrics] = useState([]);
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate API call to fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock metrics data
        const mockMetrics = [
          { 
            id: 'users',
            name: 'Total Users', 
            value: '2,854', 
            bgColor: 'bg-indigo-500', 
            iconColor: 'text-indigo-600 dark:text-indigo-400', 
            change: 12 
          },
          { 
            id: 'doctors',
            name: 'Doctors', 
            value: '284', 
            bgColor: 'bg-blue-500', 
            iconColor: 'text-blue-600 dark:text-blue-400', 
            change: 8 
          },
          { 
            id: 'records',
            name: 'Medical Records', 
            value: '12,493', 
            bgColor: 'bg-emerald-500', 
            iconColor: 'text-emerald-600 dark:text-emerald-400', 
            change: 24 
          },
          { 
            id: 'revenue',
            name: 'Monthly Revenue', 
            value: '$38,490', 
            bgColor: 'bg-amber-500', 
            iconColor: 'text-amber-600 dark:text-amber-400', 
            change: -3 
          }
        ];
        
        // Mock recent activity
        const mockActivities = [
          {
            id: 1,
            action: 'New user registered',
            user: 'Sarah Johnson',
            time: '5 minutes ago',
            icon: UserGroupIcon,
            bgColor: 'bg-indigo-100 dark:bg-indigo-900/30',
            iconColor: 'text-indigo-600 dark:text-indigo-400'
          },
          {
            id: 2,
            action: 'Doctor profile updated',
            user: 'Dr. Robert Chen',
            time: '10 minutes ago',
            icon: UserCircleIcon,
            bgColor: 'bg-blue-100 dark:bg-blue-900/30',
            iconColor: 'text-blue-600 dark:text-blue-400'
          },
          {
            id: 3,
            action: 'Medical record created',
            user: 'Dr. Michael Wilson',
            time: '25 minutes ago',
            icon: ClipboardDocumentListIcon,
            bgColor: 'bg-emerald-100 dark:bg-emerald-900/30',
            iconColor: 'text-emerald-600 dark:text-emerald-400'
          },
          {
            id: 4,
            action: 'Payment processed',
            user: 'Billing System',
            time: '45 minutes ago',
            icon: CurrencyDollarIcon,
            bgColor: 'bg-amber-100 dark:bg-amber-900/30',
            iconColor: 'text-amber-600 dark:text-amber-400'
          },
          {
            id: 5,
            action: 'System alert triggered',
            user: 'Security Monitor',
            time: '1 hour ago',
            icon: BellAlertIcon,
            bgColor: 'bg-red-100 dark:bg-red-900/30',
            iconColor: 'text-red-600 dark:text-red-400'
          }
        ];
        
        setMetrics(mockMetrics);
        setActivities(mockActivities);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Handle quick action clicks
  const handleQuickAction = (section, action) => {
    console.log(`Quick action: ${action} in ${section}`);
    if (section) {
      onTabChange(section);
    }
  };

  return (
    <div className="space-y-8 w-full mx-0 px-0">
      {/* Metrics Section */}
      <OverviewMetricsSection 
        metrics={metrics} 
        isLoading={isLoading} 
        onTabChange={onTabChange} 
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions Section - 1/3 width on large screens */}
        <div className="lg:col-span-1">
          <QuickActionsSection onActionClick={handleQuickAction} />
        </div>
        
        {/* Activity Feed Section - 2/3 width on large screens */}
        <div className="lg:col-span-2">
          <ActivityFeedSection activities={activities} isLoading={isLoading} />
        </div>
      </div>
      
      {/* System Status Section - Full width */}
      <SystemStatusSection />
    </div>
  );
}

import { 
  UserGroupIcon, 
  UserCircleIcon, 
  ClipboardDocumentListIcon, 
  ChartBarIcon,
  BuildingOfficeIcon,
  DocumentTextIcon,
  Cog6ToothIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  PlusIcon,
  ArrowPathIcon,
  ShieldCheckIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline';
import { 
  UserGroupIcon as UserGroupIconSolid,
  UserCircleIcon as UserCircleIconSolid,
  ClipboardDocumentListIcon as ClipboardDocumentListIconSolid,
  ChartBarIcon as ChartBarIconSolid
} from '@heroicons/react/24/solid';

export default function OverviewSection({ onTabChange }) {
  const metrics = [
    {
      name: 'Total Users',
      value: '1,234',
      icon: UserGroupIconSolid,
      iconColor: 'text-indigo-600',
      bgColor: 'bg-indigo-100',
      change: '+12%',
      changeType: 'positive',
      onClick: () => onTabChange('users'),
      description: 'Active accounts in the system'
    },
    {
      name: 'Active Doctors',
      value: '89',
      icon: UserCircleIconSolid,
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-100',
      change: '+5%',
      changeType: 'positive',
      onClick: () => onTabChange('doctors'),
      description: 'Verified medical professionals'
    },
    {
      name: 'Total Patients',
      value: '1,145',
      icon: UserGroupIconSolid,
      iconColor: 'text-green-600',
      bgColor: 'bg-green-100',
      change: '+8%',
      changeType: 'positive',
      onClick: () => onTabChange('patients'),
      description: 'Registered patients'
    },
    {
      name: 'Medical Records',
      value: '4,567',
      icon: ClipboardDocumentListIconSolid,
      iconColor: 'text-purple-600',
      bgColor: 'bg-purple-100',
      change: '+15%',
      changeType: 'positive',
      onClick: () => onTabChange('records'),
      description: 'Total records in the system'
    },
    {
      name: 'System Uptime',
      value: '99.9%',
      icon: ShieldCheckIcon,
      iconColor: 'text-emerald-600',
      bgColor: 'bg-emerald-100',
      change: '+0.2%',
      changeType: 'positive',
      onClick: () => onTabChange('security'),
      description: 'Last 30 days availability'
    },
    {
      name: 'Revenue',
      value: '₦4.2M',
      icon: CurrencyDollarIcon,
      iconColor: 'text-amber-600',
      bgColor: 'bg-amber-100',
      change: '+22%',
      changeType: 'positive',
      onClick: () => onTabChange('analytics'),
      description: 'Monthly subscription revenue'
    }
  ];

  const quickActions = [
    {
      name: 'Add New User',
      description: 'Create a new user account',
      icon: UserGroupIcon,
      color: 'from-indigo-500 to-blue-500',
      onClick: () => onTabChange('users')
    },
    {
      name: 'Manage Doctors',
      description: 'View and manage doctor accounts',
      icon: UserCircleIcon,
      color: 'from-blue-500 to-cyan-500',
      onClick: () => onTabChange('doctors')
    },
    {
      name: 'View Analytics',
      description: 'Access system reports and analytics',
      icon: ChartBarIcon,
      color: 'from-green-500 to-emerald-500',
      onClick: () => onTabChange('analytics')
    },
    {
      name: 'System Settings',
      description: 'Configure system settings',
      icon: Cog6ToothIcon,
      color: 'from-purple-500 to-indigo-500',
      onClick: () => onTabChange('settings')
    }
  ];
  
  // Recent activity data
  const recentActivity = [
    {
      id: 1,
      action: 'New doctor registered',
      user: 'Dr. Sarah Johnson',
      time: '2 hours ago',
      icon: UserCircleIcon,
      iconColor: 'text-blue-500',
      bgColor: 'bg-blue-100'
    },
    {
      id: 2,
      action: 'System update completed',
      user: 'Admin System',
      time: '5 hours ago',
      icon: ArrowPathIcon,
      iconColor: 'text-green-500',
      bgColor: 'bg-green-100'
    },
    {
      id: 3,
      action: 'New patient registered',
      user: 'James Wilson',
      time: '1 day ago',
      icon: UserGroupIcon,
      iconColor: 'text-indigo-500',
      bgColor: 'bg-indigo-100'
    },
    {
      id: 4,
      action: 'Security audit completed',
      user: 'System',
      time: '2 days ago',
      icon: ShieldCheckIcon,
      iconColor: 'text-purple-500',
      bgColor: 'bg-purple-100'
    }
  ];

  return (
    <div className="space-y-8 w-full mx-0 px-0">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-500 rounded-xl shadow-lg p-6 text-white">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Welcome to Admin Dashboard</h2>
            <p className="mt-1 text-indigo-100">Here's what's happening with your health service directory today.</p>
          </div>
          <div className="hidden md:block">
            <img src="https://cdn-icons-png.flaticon.com/512/2037/2037448.png" alt="Dashboard" className="h-24 w-24 opacity-80" />
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Key Metrics</h2>
          <button 
            onClick={() => onTabChange('analytics')} 
            className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center"
          >
            <span>View All Analytics</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
          {metrics.map((metric) => (
            <div
              key={metric.name}
              onClick={metric.onClick}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer border border-gray-100 hover:border-indigo-200 flex flex-col h-full"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-sm font-medium text-gray-500">{metric.name}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{metric.value}</p>
                </div>
                <div className={`h-12 w-12 rounded-full ${metric.bgColor} flex items-center justify-center`}>
                  <metric.icon className={`h-6 w-6 ${metric.iconColor}`} />
                </div>
              </div>
              <p className="text-xs text-gray-500 mb-3">{metric.description}</p>
              <div className="mt-auto pt-3 flex items-center border-t border-gray-50">
                {metric.changeType === 'positive' ? (
                  <ArrowUpIcon className="h-4 w-4 text-green-500 mr-1" />
                ) : (
                  <ArrowDownIcon className="h-4 w-4 text-red-500 mr-1" />
                )}
                <span className={`text-sm font-medium ${
                  metric.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.change}
                </span>
                <span className="text-xs text-gray-500 ml-1">from last month</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 h-full">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <PlusIcon className="h-5 w-5 mr-2 text-indigo-600" />
              Quick Actions
            </h2>
            <div className="space-y-3">
              {quickActions.map((action) => (
                <button
                  key={action.name}
                  onClick={action.onClick}
                  className="w-full flex items-center p-3 rounded-lg hover:bg-gray-50 transition-all duration-200 text-left border border-gray-100 hover:border-indigo-200 hover:shadow-sm"
                >
                  <div className={`h-10 w-10 rounded-full bg-gradient-to-r ${action.color} flex items-center justify-center mr-3 shadow-sm`}>
                    <action.icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">{action.name}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">{action.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 h-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <ArrowPathIcon className="h-5 w-5 mr-2 text-indigo-600" />
                Recent Activity
              </h2>
              <button className="text-sm text-indigo-600 hover:text-indigo-800">View All</button>
            </div>
            <div className="divide-y divide-gray-100">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center py-4 first:pt-0 last:pb-0">
                  <div className={`h-10 w-10 rounded-full ${activity.bgColor} flex items-center justify-center mr-4 flex-shrink-0`}>
                    <activity.icon className={`h-5 w-5 ${activity.iconColor}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{activity.action}</p>
                    <p className="text-xs text-gray-500 mt-0.5 truncate">By {activity.user}</p>
                  </div>
                  <div className="text-xs text-gray-500 whitespace-nowrap">{activity.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center">
            <ShieldCheckIcon className="h-5 w-5 mr-2 text-indigo-600" />
            System Status
          </h2>
          <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">All Systems Operational</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { name: 'API Services', status: 'Operational', uptime: '99.9%', color: 'bg-green-500' },
            { name: 'Database', status: 'Operational', uptime: '99.8%', color: 'bg-green-500' },
            { name: 'Storage', status: 'Operational', uptime: '100%', color: 'bg-green-500' },
            { name: 'Authentication', status: 'Operational', uptime: '99.9%', color: 'bg-green-500' }
          ].map((service, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-900">{service.name}</span>
                <div className={`h-2 w-2 rounded-full ${service.color}`}></div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">{service.status}</span>
                <span className="text-xs font-medium text-green-600">{service.uptime}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 
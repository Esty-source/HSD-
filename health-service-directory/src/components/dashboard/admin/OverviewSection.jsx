import { 
  UserGroupIcon, 
  UserCircleIcon, 
  ClipboardDocumentListIcon, 
  ChartBarIcon,
  BuildingOfficeIcon,
  DocumentTextIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';

export default function OverviewSection({ onTabChange }) {
  const metrics = [
    {
      name: 'Total Users',
      value: '1,234',
      icon: UserGroupIcon,
      change: '+12%',
      changeType: 'positive',
      onClick: () => onTabChange('users')
    },
    {
      name: 'Active Doctors',
      value: '89',
      icon: UserCircleIcon,
      change: '+5%',
      changeType: 'positive',
      onClick: () => onTabChange('doctors')
    },
    {
      name: 'Total Patients',
      value: '1,145',
      icon: UserGroupIcon,
      change: '+8%',
      changeType: 'positive',
      onClick: () => onTabChange('patients')
    },
    {
      name: 'Medical Records',
      value: '4,567',
      icon: ClipboardDocumentListIcon,
      change: '+15%',
      changeType: 'positive',
      onClick: () => onTabChange('records')
    }
  ];

  const quickActions = [
    {
      name: 'Add New User',
      description: 'Create a new user account',
      icon: UserGroupIcon,
      onClick: () => onTabChange('users')
    },
    {
      name: 'Manage Doctors',
      description: 'View and manage doctor accounts',
      icon: UserCircleIcon,
      onClick: () => onTabChange('doctors')
    },
    {
      name: 'View Reports',
      description: 'Access system reports and analytics',
      icon: ChartBarIcon,
      onClick: () => onTabChange('settings')
    },
    {
      name: 'System Settings',
      description: 'Configure system settings',
      icon: Cog6ToothIcon,
      onClick: () => onTabChange('settings')
    }
  ];

  return (
    <div className="space-y-8">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <div
            key={metric.name}
            onClick={metric.onClick}
            className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{metric.name}</p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">{metric.value}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center">
                <metric.icon className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4">
              <span className={`text-sm font-medium ${
                metric.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
              }`}>
                {metric.change}
              </span>
              <span className="text-sm text-gray-500 ml-1">from last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <button
              key={action.name}
              onClick={action.onClick}
              className="flex items-start p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-left"
            >
              <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center mr-4">
                <action.icon className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900">{action.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{action.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex items-center p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center mr-4">
                <UserCircleIcon className="h-5 w-5 text-gray-500" />
              </div>
              <div>
                <p className="text-sm text-gray-900">New doctor registration</p>
                <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 
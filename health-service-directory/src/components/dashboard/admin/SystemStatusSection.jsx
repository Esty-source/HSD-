import React from 'react';
import {
  ShieldCheckIcon,
  ServerIcon,
  CircleStackIcon,
  CloudIcon,
  LockClosedIcon
} from '@heroicons/react/24/outline';

export default function SystemStatusSection() {
  const systemServices = [
    {
      id: 'api',
      name: 'API Services',
      status: 'Operational',
      uptime: '99.9%',
      color: 'bg-green-500',
      icon: ServerIcon,
      lastChecked: '2 minutes ago'
    },
    {
      id: 'database',
      name: 'Database',
      status: 'Operational',
      uptime: '99.8%',
      color: 'bg-green-500',
      icon: CircleStackIcon,
      lastChecked: '5 minutes ago'
    },
    {
      id: 'storage',
      name: 'Storage',
      status: 'Operational',
      uptime: '100%',
      color: 'bg-green-500',
      icon: CloudIcon,
      lastChecked: '8 minutes ago'
    },
    {
      id: 'auth',
      name: 'Authentication',
      status: 'Operational',
      uptime: '99.9%',
      color: 'bg-green-500',
      icon: LockClosedIcon,
      lastChecked: '3 minutes ago'
    }
  ];

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-200 dark:border-slate-700 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
          <ShieldCheckIcon className="h-5 w-5 mr-2 text-indigo-600 dark:text-indigo-400" />
          System Status
        </h2>
        <span className="px-2.5 py-1 text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 rounded-full flex items-center">
          <span className="h-2 w-2 rounded-full bg-green-500 dark:bg-green-400 mr-1.5"></span>
          All Systems Operational
        </span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
        {systemServices.map((service) => (
          <div key={service.id} className="bg-gray-50 dark:bg-slate-700/50 rounded-lg p-4 border border-gray-100 dark:border-slate-600">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <div className={`p-2 rounded-lg ${
                  service.status === 'Operational' ? 'bg-green-100 dark:bg-green-900/30' : 'bg-amber-100 dark:bg-amber-900/30'
                } mr-3`}>
                  <service.icon className={`h-4 w-4 ${
                    service.status === 'Operational' ? 'text-green-600 dark:text-green-400' : 'text-amber-600 dark:text-amber-400'
                  }`} />
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">{service.name}</span>
              </div>
              <div className={`h-2.5 w-2.5 rounded-full ${service.color}`}></div>
            </div>
            <div className="flex justify-between items-center mt-3">
              <span className="text-xs text-gray-500 dark:text-gray-400">Uptime: {service.uptime}</span>
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Checked {service.lastChecked}</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-4 bg-gray-50 dark:bg-slate-700/30 border-t border-gray-200 dark:border-slate-600/50 flex justify-between items-center">
        <span className="text-xs text-gray-500 dark:text-gray-400">Last updated: Today at {new Date().toLocaleTimeString()}</span>
        <button className="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium">
          View Detailed Status
        </button>
      </div>
    </div>
  );
}

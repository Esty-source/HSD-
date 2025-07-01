import React from 'react';
import {
  UserPlusIcon,
  DocumentPlusIcon,
  CalendarDaysIcon,
  BellAlertIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

export default function QuickActionsSection({ actions, onActionClick }) {
  const defaultQuickActions = [
    {
      id: 'add-doctor',
      name: 'Add New Doctor',
      description: 'Register a new healthcare professional',
      icon: UserPlusIcon,
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
      textColor: 'text-blue-600 dark:text-blue-400',
      onClick: () => onActionClick('doctors', 'add')
    },
    {
      id: 'add-patient',
      name: 'Add New Patient',
      description: 'Register a new patient in the system',
      icon: UserPlusIcon,
      bgColor: 'bg-indigo-100 dark:bg-indigo-900/30',
      textColor: 'text-indigo-600 dark:text-indigo-400',
      onClick: () => onActionClick('patients', 'add')
    },
    {
      id: 'create-record',
      name: 'Create Medical Record',
      description: 'Add a new medical record for a patient',
      icon: DocumentPlusIcon,
      bgColor: 'bg-purple-100 dark:bg-purple-900/30',
      textColor: 'text-purple-600 dark:text-purple-400',
      onClick: () => onActionClick('records', 'add')
    },
    {
      id: 'schedule-appointment',
      name: 'Schedule Appointment',
      description: 'Book a new appointment',
      icon: CalendarDaysIcon,
      bgColor: 'bg-emerald-100 dark:bg-emerald-900/30',
      textColor: 'text-emerald-600 dark:text-emerald-400',
      onClick: () => onActionClick('appointments', 'schedule')
    },
    {
      id: 'send-alert',
      name: 'Send System Alert',
      description: 'Send notification to all users',
      icon: BellAlertIcon,
      bgColor: 'bg-amber-100 dark:bg-amber-900/30',
      textColor: 'text-amber-600 dark:text-amber-400',
      onClick: () => onActionClick('notifications', 'send')
    },
  ];

  const quickActionsToShow = actions || defaultQuickActions;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-200 dark:border-slate-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
          Quick Actions
        </h2>
      </div>
      
      <div className="p-6">
        <div className="space-y-3">
          {quickActionsToShow.map((action) => (
            <button
              key={action.id}
              onClick={action.onClick}
              className="w-full flex items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-all duration-200 group"
            >
              <div className={`p-2 rounded-lg mr-4 ${action.bgColor}`}>
                <action.icon className={`h-5 w-5 ${action.textColor}`} />
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {action.name}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {action.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import {
  UserGroupIcon,
  UserCircleIcon,
  ClipboardDocumentListIcon,
  ArrowPathIcon,
  ShieldCheckIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

export default function ActivityFeedSection({ activities, isLoading }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-200 dark:border-slate-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
          Recent Activity
        </h2>
      </div>
      
      <div className="divide-y divide-gray-200 dark:divide-slate-700">
        {isLoading ? (
          // Loading state with animation
          [...Array(5)].map((_, i) => (
            <div key={i} className="flex p-4 animate-pulse">
              <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-slate-700 mr-3 flex-shrink-0"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded w-1/2"></div>
              </div>
            </div>
          ))
        ) : (
          // Actual activity feed
          activities.map((activity) => (
            <div key={activity.id} className="p-4 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
              <div className="flex items-start">
                <div className={`${activity.bgColor} p-2 rounded-full mr-4 flex-shrink-0`}>
                  <activity.icon className={`h-5 w-5 ${activity.iconColor}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.action}</p>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">by {activity.user}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      
      <div className="p-4 bg-gray-50 dark:bg-slate-700/50 text-center">
        <button className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium">
          View All Activity
        </button>
      </div>
    </div>
  );
}

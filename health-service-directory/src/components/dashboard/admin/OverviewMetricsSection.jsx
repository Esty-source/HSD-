import React from 'react';
import {
  UserGroupIcon,
  UserCircleIcon,
  ClipboardDocumentListIcon,
  CurrencyDollarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';
import {
  UserGroupIcon as UserGroupIconSolid,
  UserCircleIcon as UserCircleIconSolid,
  ClipboardDocumentListIcon as ClipboardDocumentListIconSolid,
  CurrencyDollarIcon as CurrencyDollarIconSolid
} from '@heroicons/react/24/solid';

export default function OverviewMetricsSection({ metrics, isLoading, onTabChange }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric) => {
        const IconSolid = metric.id === 'users' ? UserGroupIconSolid :
                         metric.id === 'doctors' ? UserCircleIconSolid :
                         metric.id === 'records' ? ClipboardDocumentListIconSolid :
                         metric.id === 'revenue' ? CurrencyDollarIconSolid : UserGroupIconSolid;
        
        const TrendIcon = metric.change > 0 ? ArrowTrendingUpIcon :
                        metric.change < 0 ? ArrowTrendingDownIcon : ArrowPathIcon;
        
        return (
          <div 
            key={metric.id}
            onClick={metric.id !== 'revenue' ? () => onTabChange(metric.id) : undefined} 
            className={`bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm 
            ${metric.id !== 'revenue' ? 'cursor-pointer hover:shadow-md' : ''} transition-all duration-300 overflow-hidden`}
          >
            {/* Top colored bar indicator */}
            <div className={`h-1.5 w-full ${metric.bgColor}`}></div>
            
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">{metric.name}</p>
                <div className={`p-2 rounded-lg ${metric.bgColor} bg-opacity-20`}>
                  <IconSolid className={`h-5 w-5 ${metric.iconColor}`} />
                </div>
              </div>
              
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {isLoading ? (
                      <div className="animate-pulse h-8 w-20 bg-gray-200 dark:bg-slate-700 rounded"></div>
                    ) : metric.value}
                  </p>
                  
                  <div className="flex items-center mt-2">
                    <div className={`p-1 rounded ${
                      metric.change > 0 
                        ? 'bg-green-100 dark:bg-green-900/30' 
                        : metric.change < 0 
                        ? 'bg-red-100 dark:bg-red-900/30' 
                        : 'bg-gray-100 dark:bg-slate-700'
                    }`}>
                      <TrendIcon className={`h-3 w-3 ${
                        metric.change > 0 
                          ? 'text-green-600 dark:text-green-400' 
                          : metric.change < 0 
                          ? 'text-red-600 dark:text-red-400' 
                          : 'text-gray-500 dark:text-gray-400'
                      }`} />
                    </div>
                    <p className={`text-xs font-medium ml-1 ${
                      metric.change > 0 
                        ? 'text-green-600 dark:text-green-400' 
                        : metric.change < 0 
                        ? 'text-red-600 dark:text-red-400' 
                        : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {metric.change > 0 
                        ? `+${metric.change}%` 
                        : `${metric.change}%`} <span className="text-gray-500 dark:text-gray-400 ml-1">from last month</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

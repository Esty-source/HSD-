import React from 'react';
import {
  UserGroupIcon,
  ClipboardDocumentListIcon,
  UserCircleIcon,
  ChartBarIcon,
  BuildingOfficeIcon,
  Cog6ToothIcon,
  HomeIcon,
  ShieldCheckIcon,
  BellIcon,
  ArrowLeftOnRectangleIcon
} from '@heroicons/react/24/outline';
import {
  HomeIcon as HomeIconSolid,
  UserGroupIcon as UserGroupIconSolid,
  ClipboardDocumentListIcon as ClipboardDocumentListIconSolid,
  UserCircleIcon as UserCircleIconSolid,
  ChartBarIcon as ChartBarIconSolid,
  Cog6ToothIcon as Cog6ToothIconSolid,
  ShieldCheckIcon as ShieldCheckIconSolid,
  BuildingOfficeIcon as BuildingOfficeIconSolid,
  BellIcon as BellIconSolid
} from '@heroicons/react/24/solid';

export default function Sidebar({ activeTab, onTabChange, collapsed, onToggleCollapse, onLogout, user }) {
  // Nav items configuration with both outline and solid icon variants
  const navItems = [
    { 
      id: 'overview',
      name: 'Overview',
      icon: HomeIcon, 
      activeIcon: HomeIconSolid,
      badge: null
    },
    { 
      id: 'users', 
      name: 'Users Management', 
      icon: UserGroupIcon, 
      activeIcon: UserGroupIconSolid,
      badge: '856'
    },
    { 
      id: 'doctors', 
      name: 'Doctors', 
      icon: UserCircleIcon, 
      activeIcon: UserCircleIconSolid,
      badge: '147'
    },
    { 
      id: 'patients', 
      name: 'Patients', 
      icon: BuildingOfficeIcon, 
      activeIcon: BuildingOfficeIconSolid,
      badge: '703'
    },
    { 
      id: 'records', 
      name: 'Medical Records', 
      icon: ClipboardDocumentListIcon, 
      activeIcon: ClipboardDocumentListIconSolid,
      badge: null
    },
    { 
      id: 'analytics', 
      name: 'Analytics', 
      icon: ChartBarIcon, 
      activeIcon: ChartBarIconSolid,
      badge: null
    },
    { 
      id: 'notifications', 
      name: 'Notifications', 
      icon: BellIcon, 
      activeIcon: BellIconSolid,
      badge: '3'
    },
    { 
      id: 'security', 
      name: 'Security', 
      icon: ShieldCheckIcon, 
      activeIcon: ShieldCheckIconSolid,
      badge: null
    },
    { 
      id: 'settings', 
      name: 'Settings', 
      icon: Cog6ToothIcon, 
      activeIcon: Cog6ToothIconSolid,
      badge: null
    }
  ];

  return (
    <div 
      className={`${
        collapsed ? 'w-20' : 'w-72'
      } h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white flex flex-col transition-all duration-300 ease-in-out fixed left-0 top-0 shadow-xl z-30`}
    >
      {/* Logo/Header */}
      <div className="flex items-center justify-center py-6 border-b border-slate-700/50">
        {collapsed ? (
          <div className="h-10 w-10 rounded-lg bg-blue-500 flex items-center justify-center">
            <span className="font-bold text-xl">H</span>
          </div>
        ) : (
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-lg bg-blue-500 flex items-center justify-center mr-3">
              <span className="font-bold text-xl">H</span>
            </div>
            <div>
              <h1 className="font-bold text-xl">Health Service</h1>
              <p className="text-xs text-slate-400">Admin Dashboard</p>
            </div>
          </div>
        )}
      </div>

      {/* User Info */}
      <div className={`mt-6 mb-6 px-4 ${collapsed ? 'items-center' : ''} flex flex-col`}>
        <div className="flex items-center">
          <div className="h-12 w-12 rounded-full bg-gradient-to-r from-indigo-500 to-blue-600 flex items-center justify-center shadow-lg">
            <span className="font-semibold text-lg">
              {user?.name ? user.name.split(' ').map(n => n[0]).join('') : 'A'}
            </span>
          </div>
          {!collapsed && (
            <div className="ml-3">
              <h3 className="font-medium text-sm">{user?.name || 'Admin User'}</h3>
              <p className="text-xs text-slate-400">Administrator</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-3 py-2">
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            const Icon = isActive ? item.activeIcon : item.icon;

            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center ${
                  collapsed ? 'justify-center' : 'justify-between'
                } px-3 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <div className="flex items-center">
                  <Icon className={`h-5 w-5 ${isActive ? 'text-white' : ''}`} />
                  {!collapsed && (
                    <span className="ml-3 text-sm font-medium">{item.name}</span>
                  )}
                </div>
                
                {!collapsed && item.badge && (
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-700 text-slate-300'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom actions */}
      <div className="mt-auto px-3 py-4 border-t border-slate-700/50">
        <button 
          onClick={onToggleCollapse}
          className={`w-full flex items-center ${
            collapsed ? 'justify-center' : ''
          } px-3 py-3 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-xl transition-all duration-200`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {collapsed ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7M19 19l-7-7 7-7" />
            )}
          </svg>
          {!collapsed && <span className="ml-3 text-sm font-medium">Collapse Sidebar</span>}
        </button>

        <button 
          onClick={onLogout}
          className={`w-full mt-2 flex items-center ${
            collapsed ? 'justify-center' : ''
          } px-3 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-all duration-200`}
        >
          <ArrowLeftOnRectangleIcon className="h-5 w-5" />
          {!collapsed && <span className="ml-3 text-sm font-medium">Logout</span>}
        </button>
      </div>
    </div>
  );
}

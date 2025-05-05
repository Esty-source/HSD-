import { useState, useEffect } from 'react';
import { 
  Cog6ToothIcon, 
  BellIcon, 
  ShieldCheckIcon, 
  ServerIcon, 
  EnvelopeIcon, 
  GlobeAltIcon,
  ClockIcon,
  UserGroupIcon,
  CloudArrowUpIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  XMarkIcon,
  ArrowPathIcon,
  ExclamationTriangleIcon,
  DevicePhoneMobileIcon,
  LanguageIcon,
  PaintBrushIcon,
  MoonIcon,
  SunIcon,
  CurrencyDollarIcon,
  BuildingOfficeIcon,
  MapPinIcon,
  KeyIcon
} from '@heroicons/react/24/outline';

export default function SettingsSection() {
  const [settings, setSettings] = useState({
    // Notification Settings
    notifications: true,
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: false,
    
    // Security Settings
    twoFactorAuth: false,
    passwordExpiry: true,
    loginAttempts: true,
    ipRestriction: false,
    
    // System Settings
    maintenanceMode: false,
    debugMode: false,
    autoBackup: true,
    analyticsTracking: true,
    
    // User Settings
    userRegistration: true,
    accountApproval: true,
    guestAccess: false,
    multipleLogins: true,

    // Appearance Settings
    darkMode: false,
    highContrast: false,
    compactView: false,
    animationReduced: false
  });
  
  // Form inputs for advanced settings
  const [formInputs, setFormInputs] = useState({
    systemEmail: 'system@healthdirectory.cm',
    supportContact: '+237 612345678',
    maintenanceMessage: 'The system is currently undergoing scheduled maintenance. Please check back later.',
    organizationName: 'Health Service Directory Cameroon',
    address: 'Yaoundé, Cameroon',
    currency: 'XAF'
  });

  const [activeTab, setActiveTab] = useState('notifications');
  const [saveStatus, setSaveStatus] = useState(null); // null, 'saving', 'success', 'error'
  const [originalSettings, setOriginalSettings] = useState({});
  const [originalFormInputs, setOriginalFormInputs] = useState({});
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    // Store original settings when component mounts
    setOriginalSettings({...settings});
    setOriginalFormInputs({...formInputs});
  }, []);

  useEffect(() => {
    // Check if current settings differ from original
    const settingsChanged = JSON.stringify(settings) !== JSON.stringify(originalSettings);
    const formInputsChanged = JSON.stringify(formInputs) !== JSON.stringify(originalFormInputs);
    setHasChanges(settingsChanged || formInputsChanged);
  }, [settings, originalSettings, formInputs, originalFormInputs]);

  const handleToggle = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormInputs(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveSettings = () => {
    setSaveStatus('saving');
    
    // Simulate API call
    setTimeout(() => {
      setOriginalSettings({...settings});
      setOriginalFormInputs({...formInputs});
      setSaveStatus('success');
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setSaveStatus(null);
      }, 3000);
    }, 1500);
  };

  const handleResetSettings = () => {
    setSettings({...originalSettings});
    setFormInputs({...originalFormInputs});
  };

  const getIconForSetting = (settingKey) => {
    const iconMap = {
      notifications: BellIcon,
      emailNotifications: EnvelopeIcon,
      smsNotifications: DevicePhoneMobileIcon,
      marketingEmails: EnvelopeIcon,
      
      twoFactorAuth: ShieldCheckIcon,
      passwordExpiry: ClockIcon,
      loginAttempts: KeyIcon,
      ipRestriction: GlobeAltIcon,
      
      maintenanceMode: ServerIcon,
      debugMode: ExclamationTriangleIcon,
      autoBackup: CloudArrowUpIcon,
      analyticsTracking: DocumentTextIcon,
      
      userRegistration: UserGroupIcon,
      accountApproval: CheckCircleIcon,
      guestAccess: UserGroupIcon,
      multipleLogins: DevicePhoneMobileIcon,
      
      darkMode: MoonIcon,
      highContrast: SunIcon,
      compactView: PaintBrushIcon,
      animationReduced: PaintBrushIcon
    };
    
    const Icon = iconMap[settingKey] || Cog6ToothIcon;
    return Icon;
  };

  // Define tab items
  const tabs = [
    { id: 'notifications', label: 'Notifications', icon: BellIcon, color: 'blue' },
    { id: 'security', label: 'Security', icon: ShieldCheckIcon, color: 'purple' },
    { id: 'system', label: 'System', icon: ServerIcon, color: 'yellow' },
    { id: 'users', label: 'Users', icon: UserGroupIcon, color: 'green' },
    { id: 'appearance', label: 'Appearance', icon: PaintBrushIcon, color: 'pink' },
    { id: 'advanced', label: 'Advanced', icon: Cog6ToothIcon, color: 'gray' }
  ];

  // Setting items by tab
  const settingItems = {
    notifications: [
      { key: 'notifications', label: 'System Notifications', description: 'Enable or disable system notifications' },
      { key: 'emailNotifications', label: 'Email Notifications', description: 'Receive email notifications for important updates' },
      { key: 'smsNotifications', label: 'SMS Notifications', description: 'Receive text message alerts for critical updates' },
      { key: 'marketingEmails', label: 'Marketing Communications', description: 'Receive newsletters and promotional content' }
    ],
    security: [
      { key: 'twoFactorAuth', label: 'Two-Factor Authentication', description: 'Add an extra layer of security to your account' },
      { key: 'passwordExpiry', label: 'Password Expiry', description: 'Force password reset every 90 days' },
      { key: 'loginAttempts', label: 'Login Attempt Limits', description: 'Lock accounts after multiple failed login attempts' },
      { key: 'ipRestriction', label: 'IP Restrictions', description: 'Restrict access to specific IP addresses' }
    ],
    system: [
      { key: 'maintenanceMode', label: 'Maintenance Mode', description: 'Put the system in maintenance mode' },
      { key: 'debugMode', label: 'Debug Mode', description: 'Enable detailed error logging' },
      { key: 'autoBackup', label: 'Automatic Backups', description: 'Schedule regular system backups' },
      { key: 'analyticsTracking', label: 'Analytics Tracking', description: 'Collect usage data to improve the system' }
    ],
    users: [
      { key: 'userRegistration', label: 'User Registration', description: 'Allow new users to register accounts' },
      { key: 'accountApproval', label: 'Account Approval', description: 'Require admin approval for new accounts' },
      { key: 'guestAccess', label: 'Guest Access', description: 'Allow limited access without an account' },
      { key: 'multipleLogins', label: 'Multiple Sessions', description: 'Allow users to be logged in on multiple devices' }
    ],
    appearance: [
      { key: 'darkMode', label: 'Dark Mode', description: 'Use dark theme throughout the application' },
      { key: 'highContrast', label: 'High Contrast', description: 'Increase contrast for better visibility' },
      { key: 'compactView', label: 'Compact View', description: 'Reduce spacing to show more content' },
      { key: 'animationReduced', label: 'Reduced Animations', description: 'Minimize motion for accessibility' }
    ]
  };

  // Get color classes for a tab
  const getColorClasses = (tabId) => {
    const colorMap = {
      notifications: {
        bg: 'bg-blue-100',
        text: 'text-blue-600',
        border: 'border-blue-500',
        active: 'bg-blue-600',
        hover: 'hover:bg-blue-50',
        ring: 'focus:ring-blue-400'
      },
      security: {
        bg: 'bg-purple-100',
        text: 'text-purple-600',
        border: 'border-purple-500',
        active: 'bg-purple-600',
        hover: 'hover:bg-purple-50',
        ring: 'focus:ring-purple-400'
      },
      system: {
        bg: 'bg-yellow-100',
        text: 'text-yellow-600',
        border: 'border-yellow-500',
        active: 'bg-yellow-600',
        hover: 'hover:bg-yellow-50',
        ring: 'focus:ring-yellow-400'
      },
      users: {
        bg: 'bg-green-100',
        text: 'text-green-600',
        border: 'border-green-500',
        active: 'bg-green-600',
        hover: 'hover:bg-green-50',
        ring: 'focus:ring-green-400'
      },
      appearance: {
        bg: 'bg-pink-100',
        text: 'text-pink-600',
        border: 'border-pink-500',
        active: 'bg-pink-600',
        hover: 'hover:bg-pink-50',
        ring: 'focus:ring-pink-400'
      },
      advanced: {
        bg: 'bg-gray-100',
        text: 'text-gray-600',
        border: 'border-gray-500',
        active: 'bg-gray-600',
        hover: 'hover:bg-gray-50',
        ring: 'focus:ring-gray-400'
      }
    };
    
    return colorMap[tabId] || colorMap.advanced;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header with title and actions */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0 bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center">
          <Cog6ToothIcon className="h-7 w-7 text-gray-700 mr-3" />
          <h2 className="text-2xl font-bold text-gray-900">System Settings</h2>
        </div>
        
        <div className="flex space-x-3">
          {hasChanges && (
            <button
              onClick={handleResetSettings}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <ArrowPathIcon className="h-4 w-4 mr-1.5" />
              Discard Changes
            </button>
          )}
          
          <button
            onClick={handleSaveSettings}
            disabled={!hasChanges || saveStatus === 'saving'}
            className={`flex items-center px-6 py-2.5 rounded-lg text-white transition-colors shadow-sm ${hasChanges ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
          >
            {saveStatus === 'saving' ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </>
            ) : (
              <>
                <CheckCircleIcon className="h-4 w-4 mr-1.5" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>
      
      {/* Success message */}
      {saveStatus === 'success' && (
        <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-md animate-fadeIn">
          <div className="flex items-center">
            <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
            <p className="text-sm text-green-700">Settings saved successfully!</p>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Sidebar tabs */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 bg-gray-50 border-b border-gray-200">
              <h3 className="font-medium text-gray-700">Settings Categories</h3>
            </div>
            <nav className="space-y-1 p-2">
              {tabs.map(tab => {
                const TabIcon = tab.icon;
                const isActive = activeTab === tab.id;
                const colorClasses = getColorClasses(tab.id);
                
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center w-full px-3 py-3 rounded-md transition-colors ${
                      isActive 
                        ? `${colorClasses.bg} ${colorClasses.text}` 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <TabIcon className={`h-5 w-5 mr-3 ${isActive ? colorClasses.text : 'text-gray-500'}`} />
                    <span className="font-medium">{tab.label}</span>
                    {isActive && (
                      <span className="ml-auto">
                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
        
        {/* Main content */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Settings content */}
            {(activeTab === 'notifications' || activeTab === 'security' || activeTab === 'system' || activeTab === 'users' || activeTab === 'appearance') && (
              <div>
                <div className="p-4 bg-gray-50 border-b border-gray-200 flex items-center">
                  {(() => {
                    const TabIcon = tabs.find(tab => tab.id === activeTab)?.icon;
                    return TabIcon ? <TabIcon className={`h-5 w-5 mr-2 ${getColorClasses(activeTab).text}`} /> : null;
                  })()}
                  <h3 className="font-medium text-gray-900">{tabs.find(tab => tab.id === activeTab)?.label} Settings</h3>
                </div>
                
                <div className="divide-y divide-gray-100">
                  {settingItems[activeTab]?.map(item => {
                    const Icon = getIconForSetting(item.key);
                    const colorClasses = getColorClasses(activeTab);
                    
                    return (
                      <div key={item.key} className={`flex items-center justify-between p-5 ${colorClasses.hover} transition-colors`}>
                        <div className="flex items-center">
                          <div className={`h-10 w-10 rounded-full ${colorClasses.bg} flex items-center justify-center shadow-sm`}>
                            <Icon className={`h-5 w-5 ${colorClasses.text}`} />
                          </div>
                          <div className="ml-4">
                            <h4 className="text-base font-medium text-gray-900">{item.label}</h4>
                            <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                          </div>
                        </div>
                        <div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={settings[item.key]}
                              onChange={() => handleToggle(item.key)}
                              className="sr-only peer"
                            />
                            <div className={`w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 ${colorClasses.ring} rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:${colorClasses.active}`}></div>
                          </label>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            
            {/* Advanced Settings Tab */}
            {activeTab === 'advanced' && (
              <div>
                <div className="p-4 bg-gray-50 border-b border-gray-200 flex items-center">
                  <Cog6ToothIcon className="h-5 w-5 mr-2 text-gray-600" />
                  <h3 className="font-medium text-gray-900">Advanced Settings</h3>
                </div>
                
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="systemEmail" className="block text-sm font-medium text-gray-700 mb-1">System Email</label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="email"
                          name="systemEmail"
                          id="systemEmail"
                          value={formInputs.systemEmail}
                          onChange={handleInputChange}
                          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          placeholder="system@example.com"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="supportContact" className="block text-sm font-medium text-gray-700 mb-1">Support Contact</label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <DevicePhoneMobileIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          name="supportContact"
                          id="supportContact"
                          value={formInputs.supportContact}
                          onChange={handleInputChange}
                          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          placeholder="+237 612345678"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="organizationName" className="block text-sm font-medium text-gray-700 mb-1">Organization Name</label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <BuildingOfficeIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          name="organizationName"
                          id="organizationName"
                          value={formInputs.organizationName}
                          onChange={handleInputChange}
                          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Health Service Directory"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <MapPinIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          name="address"
                          id="address"
                          value={formInputs.address}
                          onChange={handleInputChange}
                          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Yaoundé, Cameroon"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="timezone" className="block text-sm font-medium text-gray-700 mb-1">System Timezone</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <GlobeAltIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <select 
                        name="timezone"
                        id="timezone"
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option>Africa/Douala (GMT+01:00)</option>
                        <option>Africa/Lagos (GMT+01:00)</option>
                        <option>Europe/London (GMT+00:00)</option>
                        <option>America/New_York (GMT-05:00)</option>
                        <option>Asia/Tokyo (GMT+09:00)</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="maintenanceMessage" className="block text-sm font-medium text-gray-700 mb-1">Maintenance Message</label>
                    <div className="mt-1">
                      <textarea
                        id="maintenanceMessage"
                        name="maintenanceMessage"
                        rows="3"
                        value={formInputs.maintenanceMessage}
                        onChange={handleInputChange}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="The system is currently undergoing scheduled maintenance. Please check back later."
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="text-xs text-gray-400 text-center">&copy; {new Date().getFullYear()} Health Service Directory - Cameroon</div>
    </div>
  );
}

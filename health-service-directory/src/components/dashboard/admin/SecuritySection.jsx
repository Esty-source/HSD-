import { useState } from 'react';
import { 
  ShieldCheckIcon, 
  LockClosedIcon, 
  UserGroupIcon, 
  KeyIcon,
  FingerPrintIcon,
  ClockIcon,
  GlobeAltIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon,
  DocumentTextIcon,
  EyeIcon,
  EyeSlashIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

export default function SecuritySection() {
  const [activeTab, setActiveTab] = useState('authentication');
  const [showSavedMessage, setShowSavedMessage] = useState(false);
  
  // Authentication settings
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [passwordExpiry, setPasswordExpiry] = useState(90);
  const [minPasswordLength, setMinPasswordLength] = useState(8);
  const [requireSpecialChars, setRequireSpecialChars] = useState(true);
  const [requireNumbers, setRequireNumbers] = useState(true);
  const [requireUppercase, setRequireUppercase] = useState(true);
  
  // Access control settings
  const [maxLoginAttempts, setMaxLoginAttempts] = useState(5);
  const [sessionTimeout, setSessionTimeout] = useState(30);
  const [ipRestriction, setIpRestriction] = useState(false);
  const [allowedIPs, setAllowedIPs] = useState('');
  const [enforceRolePermissions, setEnforceRolePermissions] = useState(true);
  
  // Data protection settings
  const [dataEncryption, setDataEncryption] = useState(true);
  const [backupEncryption, setBackupEncryption] = useState(true);
  const [dataRetentionPeriod, setDataRetentionPeriod] = useState(365);
  const [anonymizeData, setAnonymizeData] = useState(false);
  
  // Audit & compliance settings
  const [enableAuditLogs, setEnableAuditLogs] = useState(true);
  const [logRetentionPeriod, setLogRetentionPeriod] = useState(180);
  const [trackUserActivity, setTrackUserActivity] = useState(true);
  const [alertOnSuspiciousActivity, setAlertOnSuspiciousActivity] = useState(true);

  // Handle save settings
  const handleSaveSettings = () => {
    // In a real app, this would save to backend
    console.log('Saving security settings...');
    setShowSavedMessage(true);
    setTimeout(() => {
      setShowSavedMessage(false);
    }, 3000);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <ShieldCheckIcon className="h-7 w-7 mr-2 text-indigo-600" />
          Security Settings
        </h2>
        <div className="flex space-x-3">
          <button 
            onClick={handleSaveSettings}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
          >
            <CheckCircleIcon className="h-5 w-5 mr-1.5" />
            Save Changes
          </button>
        </div>
      </div>

      {showSavedMessage && (
        <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-lg flex items-center">
          <CheckCircleIcon className="h-5 w-5 mr-2" />
          Security settings saved successfully!
        </div>
      )}

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('authentication')}
            className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
              activeTab === 'authentication'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <KeyIcon className="h-5 w-5 mr-2" />
            Authentication
          </button>
          <button
            onClick={() => setActiveTab('access')}
            className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
              activeTab === 'access'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <UserGroupIcon className="h-5 w-5 mr-2" />
            Access Control
          </button>
          <button
            onClick={() => setActiveTab('data')}
            className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
              activeTab === 'data'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <LockClosedIcon className="h-5 w-5 mr-2" />
            Data Protection
          </button>
          <button
            onClick={() => setActiveTab('audit')}
            className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
              activeTab === 'audit'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <DocumentTextIcon className="h-5 w-5 mr-2" />
            Audit & Compliance
          </button>
        </nav>
      </div>

      {/* Authentication Tab */}
      {activeTab === 'authentication' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-5 border-b border-gray-200 bg-gray-50">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <FingerPrintIcon className="h-5 w-5 mr-2 text-indigo-600" />
                Two-Factor Authentication
              </h3>
            </div>
            <div className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-700">Require two-factor authentication for all users</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Users will be required to verify their identity using a second method
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={twoFactorEnabled}
                    onChange={() => setTwoFactorEnabled(!twoFactorEnabled)}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-5 border-b border-gray-200 bg-gray-50">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <KeyIcon className="h-5 w-5 mr-2 text-indigo-600" />
                Password Policy
              </h3>
            </div>
            <div className="p-5 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="passwordExpiry" className="block text-sm font-medium text-gray-700 mb-1">
                    Password Expiry (days)
                  </label>
                  <input
                    type="number"
                    id="passwordExpiry"
                    value={passwordExpiry}
                    onChange={(e) => setPasswordExpiry(parseInt(e.target.value))}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Set to 0 for no expiration
                  </p>
                </div>
                <div>
                  <label htmlFor="minPasswordLength" className="block text-sm font-medium text-gray-700 mb-1">
                    Minimum Password Length
                  </label>
                  <input
                    type="number"
                    id="minPasswordLength"
                    value={minPasswordLength}
                    onChange={(e) => setMinPasswordLength(parseInt(e.target.value))}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="flex items-center">
                  <input
                    id="requireSpecialChars"
                    type="checkbox"
                    checked={requireSpecialChars}
                    onChange={() => setRequireSpecialChars(!requireSpecialChars)}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label htmlFor="requireSpecialChars" className="ml-2 block text-sm text-gray-700">
                    Require special characters
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="requireNumbers"
                    type="checkbox"
                    checked={requireNumbers}
                    onChange={() => setRequireNumbers(!requireNumbers)}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label htmlFor="requireNumbers" className="ml-2 block text-sm text-gray-700">
                    Require numbers
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="requireUppercase"
                    type="checkbox"
                    checked={requireUppercase}
                    onChange={() => setRequireUppercase(!requireUppercase)}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label htmlFor="requireUppercase" className="ml-2 block text-sm text-gray-700">
                    Require uppercase letters
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Access Control Tab */}
      {activeTab === 'access' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-5 border-b border-gray-200 bg-gray-50">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <ExclamationTriangleIcon className="h-5 w-5 mr-2 text-indigo-600" />
                Login Security
              </h3>
            </div>
            <div className="p-5 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="maxLoginAttempts" className="block text-sm font-medium text-gray-700 mb-1">
                    Max Failed Login Attempts
                  </label>
                  <input
                    type="number"
                    id="maxLoginAttempts"
                    value={maxLoginAttempts}
                    onChange={(e) => setMaxLoginAttempts(parseInt(e.target.value))}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Account will be locked after this many failed attempts
                  </p>
                </div>
                <div>
                  <label htmlFor="sessionTimeout" className="block text-sm font-medium text-gray-700 mb-1">
                    Session Timeout (minutes)
                  </label>
                  <input
                    type="number"
                    id="sessionTimeout"
                    value={sessionTimeout}
                    onChange={(e) => setSessionTimeout(parseInt(e.target.value))}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Users will be logged out after this period of inactivity
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-5 border-b border-gray-200 bg-gray-50">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <GlobeAltIcon className="h-5 w-5 mr-2 text-indigo-600" />
                IP Restrictions
              </h3>
            </div>
            <div className="p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-700">Enable IP address restrictions</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Only allow access from specific IP addresses
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={ipRestriction}
                    onChange={() => setIpRestriction(!ipRestriction)}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
              
              {ipRestriction && (
                <div>
                  <label htmlFor="allowedIPs" className="block text-sm font-medium text-gray-700 mb-1">
                    Allowed IP Addresses (one per line)
                  </label>
                  <textarea
                    id="allowedIPs"
                    rows={4}
                    value={allowedIPs}
                    onChange={(e) => setAllowedIPs(e.target.value)}
                    placeholder="192.168.1.1&#10;10.0.0.1"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Enter each IP address on a new line. Use CIDR notation for ranges (e.g., 192.168.1.0/24)
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-5 border-b border-gray-200 bg-gray-50">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <UserGroupIcon className="h-5 w-5 mr-2 text-indigo-600" />
                Role-Based Access
              </h3>
            </div>
            <div className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-700">Enforce strict role-based permissions</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Users can only access features assigned to their role
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={enforceRolePermissions}
                    onChange={() => setEnforceRolePermissions(!enforceRolePermissions)}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Data Protection Tab */}
      {activeTab === 'data' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-5 border-b border-gray-200 bg-gray-50">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <LockClosedIcon className="h-5 w-5 mr-2 text-indigo-600" />
                Data Encryption
              </h3>
            </div>
            <div className="p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-700">Enable data encryption at rest</p>
                  <p className="text-sm text-gray-500 mt-1">
                    All sensitive data will be encrypted in the database
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={dataEncryption}
                    onChange={() => setDataEncryption(!dataEncryption)}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-700">Encrypt database backups</p>
                  <p className="text-sm text-gray-500 mt-1">
                    All backup files will be encrypted
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={backupEncryption}
                    onChange={() => setBackupEncryption(!backupEncryption)}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-5 border-b border-gray-200 bg-gray-50">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <ClockIcon className="h-5 w-5 mr-2 text-indigo-600" />
                Data Retention
              </h3>
            </div>
            <div className="p-5 space-y-5">
              <div>
                <label htmlFor="dataRetentionPeriod" className="block text-sm font-medium text-gray-700 mb-1">
                  Data Retention Period (days)
                </label>
                <input
                  type="number"
                  id="dataRetentionPeriod"
                  value={dataRetentionPeriod}
                  onChange={(e) => setDataRetentionPeriod(parseInt(e.target.value))}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                <p className="mt-1 text-sm text-gray-500">
                  How long to keep inactive user data and records
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-700">Anonymize data after retention period</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Instead of deleting, anonymize personal information
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={anonymizeData}
                    onChange={() => setAnonymizeData(!anonymizeData)}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Audit & Compliance Tab */}
      {activeTab === 'audit' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-5 border-b border-gray-200 bg-gray-50">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <DocumentTextIcon className="h-5 w-5 mr-2 text-indigo-600" />
                Audit Logging
              </h3>
            </div>
            <div className="p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-700">Enable detailed audit logs</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Track all system changes and user actions
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={enableAuditLogs}
                    onChange={() => setEnableAuditLogs(!enableAuditLogs)}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>

              {enableAuditLogs && (
                <>
                  <div>
                    <label htmlFor="logRetentionPeriod" className="block text-sm font-medium text-gray-700 mb-1">
                      Log Retention Period (days)
                    </label>
                    <input
                      type="number"
                      id="logRetentionPeriod"
                      value={logRetentionPeriod}
                      onChange={(e) => setLogRetentionPeriod(parseInt(e.target.value))}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      id="trackUserActivity"
                      type="checkbox"
                      checked={trackUserActivity}
                      onChange={() => setTrackUserActivity(!trackUserActivity)}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label htmlFor="trackUserActivity" className="ml-2 block text-sm text-gray-700">
                      Track detailed user activity (page views, searches)
                    </label>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-5 border-b border-gray-200 bg-gray-50">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <ExclamationTriangleIcon className="h-5 w-5 mr-2 text-indigo-600" />
                Security Alerts
              </h3>
            </div>
            <div className="p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-700">Alert on suspicious activity</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Send notifications for unusual login attempts or data access
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={alertOnSuspiciousActivity}
                    onChange={() => setAlertOnSuspiciousActivity(!alertOnSuspiciousActivity)}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>

              {alertOnSuspiciousActivity && (
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-yellow-800">Alert Configuration</h3>
                      <div className="mt-2 text-sm text-yellow-700">
                        <p>
                          Alerts will be sent to system administrators via email and SMS. Configure alert recipients in the Notifications section.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

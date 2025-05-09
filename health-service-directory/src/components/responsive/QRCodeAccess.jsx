import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { ArrowPathIcon, XMarkIcon, ChevronUpIcon, ChevronDownIcon, DevicePhoneMobileIcon } from '@heroicons/react/24/outline';
import { useViewport } from './ViewportProvider';

export default function QRCodeAccess() {
  const [ipAddresses, setIpAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [collapsed, setCollapsed] = useState(true); // Default to collapsed on mobile
  const { isMobile } = useViewport();
  const port = window.location.port || (window.location.protocol === 'https:' ? '443' : '80');

  // Function to get network access information
  const getNetworkInterfaces = async () => {
    try {
      setLoading(true);
      setError(null);

      // Short delay to show loading state
      await new Promise(resolve => setTimeout(resolve, 300));

      const addresses = [];
      
      // Get the current hostname and port
      const hostname = window.location.hostname;
      const port = window.location.port;
      const protocol = window.location.protocol;
      
      // Add the current URL
      addresses.push({ name: 'Current URL', address: window.location.origin });
      
      // Add local IP address for mobile access
      // This is your actual local IP address from ipconfig
      const localIpAddress = '192.168.1.95';
      addresses.push({ 
        name: 'Local Network IP (Use this on mobile)', 
        address: `${protocol}//${localIpAddress}:${port}` 
      });

      setIpAddresses(addresses);
      setLoading(false);
    } catch (err) {
      console.error('Error getting access URLs:', err);
      setError('Failed to generate access URLs. Please try again.');
      setLoading(false);
    }
  };

  useEffect(() => {
    getNetworkInterfaces();
  }, []);

  // Determine if we should show the QR code panel based on device
  // Don't show on mobile devices since they're already on mobile
  const shouldShowPanel = !isMobile;

  if (!shouldShowPanel) return null;

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const getQRCodeUrl = (address) => {
    // Use the provided address (which could be the local IP) to create the URL
    if (!address) {
      // Fallback to current origin if no address is provided
      return `${window.location.origin}/simple`;
    }
    
    // If address already includes protocol, use it as is
    if (address.startsWith('http')) {
      return `${address}/simple`;
    }
    
    // Otherwise add the simple path to the address
    return `${address}/simple`;
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const refreshInterfaces = () => {
    getNetworkInterfaces();
  };

  return (
    <div className={`fixed bottom-4 right-4 bg-white rounded-lg shadow-lg transition-all duration-300 z-30 ${collapsed ? 'w-12' : 'w-80'}`}>
      {/* Header with collapse button */}
      <div className="flex justify-between items-center p-3 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
        {!collapsed && (
          <div className="flex items-center">
            <DevicePhoneMobileIcon className="h-5 w-5 text-blue-600 mr-2" />
            <h3 className="font-medium text-gray-800">Mobile Access</h3>
          </div>
        )}
        <button
          onClick={toggleCollapsed}
          className="p-1 rounded-full hover:bg-white/50 active:bg-white/80 transition-colors"
          aria-label={collapsed ? 'Expand QR code panel' : 'Collapse QR code panel'}
        >
          {collapsed ? (
            <ChevronUpIcon className="h-5 w-5 text-gray-600" />
          ) : (
            <ChevronDownIcon className="h-5 w-5 text-gray-600" />
          )}
        </button>
      </div>

      {/* Content (hidden when collapsed) */}
      {!collapsed && (
        <div className="p-4">
          <p className="text-sm text-gray-600 mb-4">
            Scan this QR code with your mobile device to access this page:
          </p>

          {loading ? (
            <div className="flex justify-center items-center h-40">
              <svg className="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          ) : error ? (
            <div className="text-center p-4">
              <p className="text-red-500 mb-2">{error}</p>
              <button
                onClick={refreshInterfaces}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : (
            <div>
              {ipAddresses.map((ip, index) => (
                <div key={index} className="mb-6 last:mb-0 bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs font-medium text-gray-700 mb-2">{ip.name}:</p>
                  <div className="flex justify-center bg-white p-2 rounded-lg border border-gray-200">
                    <QRCodeSVG 
                      value={getQRCodeUrl(ip.address)}
                      size={160}
                      level="H"
                      includeMargin={true}
                      fgColor="#1e40af"
                      bgColor="#ffffff"
                      renderAs="svg"
                    />
                  </div>
                  <div className="mt-2 relative">
                    <p className="text-xs text-center text-gray-600 break-all bg-white p-2 rounded border border-gray-200">
                      {getQRCodeUrl(ip.address)}
                    </p>
                    <button
                      onClick={() => copyToClipboard(getQRCodeUrl(ip.address))}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-600 text-xs font-medium"
                      aria-label="Copy URL"
                    >
                      Copy
                    </button>
                  </div>
                </div>
              ))}

              <div className="mt-4">
                <button
                  onClick={refreshInterfaces}
                  className="w-full flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <ArrowPathIcon className="h-4 w-4 mr-2" />
                  Refresh
                </button>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <h4 className="font-medium text-sm mb-2">Troubleshooting:</h4>
                <ul className="text-xs text-gray-600 space-y-1 list-disc pl-4">
                  <li>Make sure your mobile device is on the same Wi-Fi network</li>
                  <li>For local development: Replace 'localhost' with your computer's actual IP address on your network (e.g., 192.168.1.x)</li>
                  <li>If using a VPN, try disconnecting from it</li>
                  <li>Check your firewall settings if you can't connect</li>
                  <li>Try accessing the URL directly in your mobile browser</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

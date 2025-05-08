import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';

export default function QRCodeAccess() {
  const [networkUrl, setNetworkUrl] = useState('');
  const [ipAddresses, setIpAddresses] = useState([]);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Function to get all IP addresses from the network interfaces
    const getNetworkInterfaces = async () => {
      try {
        // We can't directly access network interfaces in the browser
        // So we'll use a simple heuristic to guess the local IP
        // This is a common pattern for local development
        const possibleIPs = [];
        
        // Add localhost
        possibleIPs.push('localhost');
        
        // Try to get the local IP by creating a dummy connection
        // This is a hack but works in many browsers
        const RTCPeerConnection = window.RTCPeerConnection || 
                                 window.webkitRTCPeerConnection || 
                                 window.mozRTCPeerConnection;
                                 
        if (RTCPeerConnection) {
          const pc = new RTCPeerConnection({ iceServers: [] });
          pc.createDataChannel('');
          pc.createOffer().then(pc.setLocalDescription.bind(pc));
          
          pc.onicecandidate = (ice) => {
            if (!ice || !ice.candidate || !ice.candidate.candidate) return;
            
            const ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3})/;
            const ipMatch = ipRegex.exec(ice.candidate.candidate);
            
            if (ipMatch && ipMatch[1] && !ipMatch[1].startsWith('127.')) {
              possibleIPs.push(ipMatch[1]);
              setIpAddresses(prev => [...new Set([...prev, ipMatch[1]])]);
            }
            
            pc.onicecandidate = null;
          };
        }
        
        // Fallback to some common local network IPs
        // We'll add these anyway as the above method doesn't always work
        const commonLocalIPs = [
          '192.168.1.95', // From your ipconfig output
          '192.168.0.1',
          '192.168.1.1',
          '10.0.0.1'
        ];
        
        setIpAddresses([...new Set([...possibleIPs, ...commonLocalIPs])]);
      } catch (error) {
        console.error('Error getting network interfaces:', error);
      }
    };

    getNetworkInterfaces();
  }, []);

  // Toggle visibility of the QR code panel
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className={`fixed bottom-20 right-4 z-50 bg-white rounded-lg shadow-lg transition-all duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-semibold text-gray-700">Scan to access on mobile</h3>
          <button 
            onClick={toggleVisibility}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        
        <div className="space-y-4">
          {ipAddresses.map((ip, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="bg-gray-100 p-2 rounded-lg">
                <QRCodeSVG 
                  value={`http://${ip}:5173`} 
                  size={120}
                  bgColor={"#ffffff"}
                  fgColor={"#000000"}
                  level={"L"}
                  includeMargin={false}
                />
              </div>
              <p className="text-xs text-gray-600 mt-1">{`http://${ip}:5173`}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-3 text-xs text-gray-500">
          <p>Connect your phone to the same WiFi network as this computer.</p>
        </div>
      </div>
      
      {/* Toggle button when panel is hidden */}
      {!isVisible && (
        <button
          onClick={toggleVisibility}
          className="fixed bottom-4 right-4 z-50 bg-blue-600 text-white p-3 rounded-full shadow-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2m0 0v5m0-5h2m6-6V4" />
          </svg>
        </button>
      )}
    </div>
  );
}

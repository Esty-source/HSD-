import React from 'react';
import QRCode from 'qrcode.react';

export default function ExpoQRCode() {
  // You'll need to replace this with your actual development server URL
  const serverUrl = 'http://192.168.1.95:5173';
  const expoUrl = `exp://192.168.1.95:5173`;
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-4">Test on Mobile Device</h1>
        
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Direct Web Access</h2>
          <p className="text-sm text-gray-600 mb-3">
            Scan this QR code with your phone's camera app to open the web app directly in your browser:
          </p>
          <div className="flex justify-center p-3 bg-gray-50 rounded-lg">
            <QRCode value={serverUrl} size={200} />
          </div>
          <p className="text-xs text-center mt-2 text-gray-500">
            URL: {serverUrl}
          </p>
        </div>
        
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Expo Go Access</h2>
          <p className="text-sm text-gray-600 mb-3">
            Scan this QR code with the Expo Go app to open the web app in Expo:
          </p>
          <div className="flex justify-center p-3 bg-gray-50 rounded-lg">
            <QRCode value={expoUrl} size={200} />
          </div>
          <p className="text-xs text-center mt-2 text-gray-500">
            URL: {expoUrl}
          </p>
        </div>
        
        <div className="mt-6 text-sm text-gray-600">
          <h3 className="font-medium mb-1">Testing Instructions:</h3>
          <ol className="list-decimal pl-5 space-y-1">
            <li>Make sure your phone is connected to the same WiFi network as your computer</li>
            <li>Scan the appropriate QR code above</li>
            <li>Navigate to different pages to test the mobile versions</li>
            <li>Try the test page at <code>/test</code> to verify viewport detection</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
